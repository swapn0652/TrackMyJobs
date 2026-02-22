/*
  Warnings:

  - The values [PASS,FAIL] on the enum `RoundResult` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoundResult_new" AS ENUM ('PASSED', 'FAILED', 'WAITING');
ALTER TABLE "public"."InterviewRound" ALTER COLUMN "result" DROP DEFAULT;
ALTER TABLE "InterviewRound" ALTER COLUMN "result" TYPE "RoundResult_new" USING ("result"::text::"RoundResult_new");
ALTER TYPE "RoundResult" RENAME TO "RoundResult_old";
ALTER TYPE "RoundResult_new" RENAME TO "RoundResult";
DROP TYPE "public"."RoundResult_old";
ALTER TABLE "InterviewRound" ALTER COLUMN "result" SET DEFAULT 'WAITING';
COMMIT;
