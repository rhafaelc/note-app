CREATE TABLE IF NOT EXISTS "notess" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";