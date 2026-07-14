-- Feedback: floating widget support (type, guest/logged-in user, source page)
--
-- NOTE ON IDEMPOTENCY: the `Feedback` model was added to schema.prisma in a
-- prior commit (feat: ... add feedback API ...) but no migration file was ever
-- generated for it, so this repo's migration history does not match
-- schema.prisma (drift). We don't know whether the live database already has
-- a `Feedback` table (created via `prisma db push` or manually) or not, so
-- every statement below is written defensively (CREATE ... IF NOT EXISTS /
-- guarded DO blocks) so it is safe to run whichever state the database is in.

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "FeedbackType" AS ENUM ('FEEDBACK', 'ISSUE');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- CreateTable (only runs if `Feedback` doesn't exist yet)
CREATE TABLE IF NOT EXISTS "Feedback" (
    "id" TEXT NOT NULL,
    "type" "FeedbackType" NOT NULL DEFAULT 'FEEDBACK',
    "message" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "pageUrl" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AlterTable (only runs if `Feedback` already existed from before this migration)
ALTER TABLE "Feedback" ADD COLUMN IF NOT EXISTS "type" "FeedbackType" NOT NULL DEFAULT 'FEEDBACK';
ALTER TABLE "Feedback" ADD COLUMN IF NOT EXISTS "pageUrl" TEXT;
ALTER TABLE "Feedback" ADD COLUMN IF NOT EXISTS "userId" TEXT;
ALTER TABLE "Feedback" ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Feedback_userId_idx" ON "Feedback"("userId");
CREATE INDEX IF NOT EXISTS "Feedback_type_idx" ON "Feedback"("type");
CREATE INDEX IF NOT EXISTS "Feedback_createdAt_idx" ON "Feedback"("createdAt");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
