// Prisma 7 config file — replaces url/directUrl in schema.prisma
// Prisma CLI reads this for all migrate/push/generate commands.
//
// We use DIRECT_URL (session-mode pooler, no pgbouncer) here because
// Prisma CLI needs a direct connection for schema introspection and migrations.
// Runtime queries use DATABASE_URL (transaction-mode pooler) via the adapter in lib/prisma.ts.

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
