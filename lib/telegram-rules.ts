/**
 * Telegram bot constants — rate-limit config and parsing constraints.
 * Kept in one place so they're easy to tune without touching handler logic.
 */
export const TELEGRAM_RULES = {
  rateLimit: {
    /** Max requests per window per chatId */
    requests: 20,
    /** Sliding window in seconds */
    windowSeconds: 60,
    /** Upstash Redis key prefix */
    redisPrefix: "tg_rl",
  },
  parse: {
    /** Hard cap on inbound message length before processing */
    maxTextLength: 10_000,
    /** Max tag count per resource/note */
    maxTags: 10,
    /** Max title length after trim */
    maxTitleLength: 300,
    /** Max description length after trim */
    maxDescLength: 1_000,
  },
  token: {
    /** Connect token prefix — easy to identify in Telegram */
    prefix: "qatg_",
    /** Minutes until a pending connect token expires */
    expiryMinutes: 15,
  },
} as const;
