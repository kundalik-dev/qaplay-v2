/**
 * Minimal Telegram Bot API client.
 *
 * sendTelegramMessage — send a MarkdownV2 message to a chatId.
 * Always resolves (errors are logged, not thrown) so webhook handlers
 * stay simple and always return HTTP 200 to Telegram.
 */

const TELEGRAM_API_BASE = "https://api.telegram.org";

/**
 * Send a Telegram message using Markdown parse mode.
 * Falls back to plain text if the formatted send fails.
 */
export async function sendTelegramMessage(
  chatId: string,
  text: string,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("[TelegramBot] TELEGRAM_BOT_TOKEN is not set");
    return;
  }

  const url = `${TELEGRAM_API_BASE}/bot${token}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      // Markdown parse errors — retry as plain text
      if (res.status === 400 && err.includes("can't parse")) {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        return;
      }
      console.error(`[TelegramBot] sendMessage failed ${res.status}: ${err}`);
    }
  } catch (err) {
    console.error("[TelegramBot] Network error:", err);
  }
}
