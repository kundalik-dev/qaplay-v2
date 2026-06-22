/**
 * POST /api/telegram/webhook
 *
 * Handles all inbound Telegram bot updates.
 *
 * Security:
 *  - Validates X-Telegram-Bot-Api-Secret-Token header (set when registering the webhook)
 *  - Rate-limits by chatId via Upstash Redis (optional — gracefully skipped if env vars absent)
 *  - ALWAYS returns HTTP 200 so Telegram doesn't retry the same update
 *
 * Supported commands:
 *  /start | /help         — usage guide
 *  /connect <token>       — link Telegram account to QA Playground user
 *  https://...            — save a resource (URL auto-titled via OG scrape)
 *  #todo <title> [@Xmin]  — create a daily task
 *  #note <content> [#tag] — create a note
 */

import { createHash } from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram-bot";
import {
  detectMessageType,
  fetchUrlMetadata,
  parseConnect,
  parseResource,
  sanitizeText,
} from "@/lib/telegram-parser";
import { TELEGRAM_RULES } from "@/lib/telegram-rules";

// ── Rate limiter (optional Upstash) ──────────────────────────────────────────

type Ratelimiter = { limit: (id: string) => Promise<{ success: boolean }> };
let ratelimit: Ratelimiter | null = null;

async function getRatelimit(): Promise<Ratelimiter | null> {
  if (ratelimit) return ratelimit;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    const { rateLimit: RL } = TELEGRAM_RULES;
    ratelimit = new Ratelimit({
      redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      }),
      limiter: Ratelimit.slidingWindow(RL.requests, `${RL.windowSeconds} s`),
      prefix: RL.redisPrefix,
      analytics: false,
    });
    return ratelimit;
  } catch (err) {
    console.error("[Webhook] Failed to initialise rate limiter:", err);
    return null;
  }
}

// ── Help text ────────────────────────────────────────────────────────────────

const HELP_TEXT = `📋 *QA Playground Bot*

*Save a resource* — paste any URL
\`https://example.com\`
\`https://example.com "my description" #js\`

*Create a todo*
\`#todo Review PR @30min\`
\`#todo Deploy hotfix @2h\`
_time estimate is optional_

*Save a note*
\`#note Your note content here #tag1 #tag2\`

*Link your account (one-time)*
\`/connect qatg_<token>\`
_Get your token: qaplayground.dev → Resources → Telegram Bot_`;

// ── Telegram always expects HTTP 200 ──────────────────────────────────────────

const ok = () => new NextResponse(null, { status: 200 });

// ── POST handler ──────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // 1. Verify webhook secret — hard-fail if not configured
  if (!process.env.TELEGRAM_WEBHOOK_SECRET) {
    console.error("[Webhook] TELEGRAM_WEBHOOK_SECRET is not set");
    return new NextResponse(null, { status: 503 });
  }
  const incomingSecret = request.headers.get("x-telegram-bot-api-secret-token");
  if (incomingSecret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new NextResponse(null, { status: 401 });
  }

  // 2. Parse Telegram update
  let body: {
    message?: {
      text?: string;
      chat?: { id?: number };
      from?: { username?: string };
    };
  };
  try {
    body = await request.json();
  } catch {
    return ok();
  }

  const message = body?.message;
  if (!message?.text) return ok();

  const chatId = String(message.chat?.id ?? "");
  const text = sanitizeText(message.text.trim());
  const username = message.from?.username ?? null;

  if (!chatId || !text) return ok();

  // 3. Rate limit by chatId
  const rl = await getRatelimit();
  if (rl) {
    const { success } = await rl.limit(chatId);
    if (!success) {
      await sendTelegramMessage(chatId, "⏳ Too many messages. Please wait a minute.");
      return ok();
    }
  }

  // 4. Detect type and route
  const type = detectMessageType(text);

  if (type === "help") {
    await sendTelegramMessage(chatId, HELP_TEXT);
    return ok();
  }

  if (type === "connect") {
    await handleConnect(chatId, username, text);
    return ok();
  }

  // All save commands require a linked account
  const telegramUser = await prisma.telegramUser.findUnique({
    where: { chatId },
    select: { userId: true },
  });

  if (!telegramUser?.userId) {
    await sendTelegramMessage(
      chatId,
      "🔗 *Link your account first*\n\nSend: `/connect qatg_<token>`\n_Get your token at qaplayground.dev → Resources → Telegram Bot_",
    );
    return ok();
  }

  const { userId } = telegramUser;

  switch (type) {
    case "todo":     await handleTodo(chatId, userId, text);     break;
    case "resource": await handleResource(chatId, userId, text); break;
    case "note":     await handleNote(chatId, userId, text);     break;
    // "unknown" — ignore silently
  }

  return ok();
}

// ── /connect ──────────────────────────────────────────────────────────────────

async function handleConnect(
  chatId: string,
  username: string | null,
  text: string,
): Promise<void> {
  const parsed = parseConnect(text);
  if (!parsed) {
    await sendTelegramMessage(
      chatId,
      "❌ Invalid format. Use:\n`/connect qatg_<token>`",
    );
    return;
  }

  const tokenHash = createHash("sha256").update(parsed.token).digest("hex");

  const record = await prisma.telegramUser.findFirst({
    where: {
      tokenHash,
      tokenExpiry: { gt: new Date() },
    },
  });

  if (!record) {
    await sendTelegramMessage(
      chatId,
      "❌ *Invalid or expired token.*\n\nGenerate a new one at qaplayground.dev → Resources → Telegram Bot",
    );
    return;
  }

  // Guard: this chatId is already linked to a different account
  const alreadyLinked = await prisma.telegramUser.findUnique({ where: { chatId } });
  if (alreadyLinked && alreadyLinked.userId !== record.userId) {
    await sendTelegramMessage(
      chatId,
      "⚠️ This Telegram account is already linked to another QA Playground account.",
    );
    return;
  }

  await prisma.telegramUser.update({
    where: { id: record.id },
    data: { chatId, username, tokenHash: null, tokenExpiry: null },
  });

  await sendTelegramMessage(
    chatId,
    "✅ *Telegram linked to your QA Playground account!*\n\nSend /help to see available commands.",
  );
}

// ── Resource (URL) ────────────────────────────────────────────────────────────

async function handleResource(
  chatId: string,
  userId: string,
  text: string,
): Promise<void> {
  const parsed = parseResource(text);
  if (!parsed) {
    await sendTelegramMessage(chatId, "❌ Could not find a valid URL in your message.");
    return;
  }

  try {
    const meta = await fetchUrlMetadata(parsed.url);
    const title = (meta.title ?? parsed.url).slice(0, 300);
    const description = (parsed.description ?? meta.description ?? null)?.slice(0, 1000) ?? null;
    const image = meta.image ?? null;

    await prisma.resource.create({
      data: {
        userId,
        resourceType: "OTHER",
        title,
        url: parsed.url,
        description,
        tags: parsed.tags,
        image,
        source: "telegram",
      },
    });

    await sendTelegramMessage(
      chatId,
      `✅ *Resource saved*\n${title}\n_Edit at qaplayground.dev → Resources_`,
    );
  } catch (err) {
    console.error("[Webhook] handleResource:", err instanceof Error ? err.message : err);
    await sendTelegramMessage(chatId, "❌ Failed to save resource. Please try again.");
  }
}

// ── #todo ─────────────────────────────────────────────────────────────────────

async function handleTodo(
  chatId: string,
  _userId: string,
  _text: string,
): Promise<void> {
  // TODO: DailyTask model not yet in schema — coming soon
  await sendTelegramMessage(
    chatId,
    "⏳ *Todos via Telegram are coming soon!*\n\nFor now, paste a URL to save a resource.",
  );
}

// ── #note ─────────────────────────────────────────────────────────────────────

async function handleNote(
  chatId: string,
  _userId: string,
  _text: string,
): Promise<void> {
  // TODO: Note model not yet in schema — coming soon
  await sendTelegramMessage(
    chatId,
    "⏳ *Notes via Telegram are coming soon!*\n\nFor now, paste a URL to save a resource.",
  );
}
