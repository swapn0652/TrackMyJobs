/*
  Warnings:

  - You are about to drop the column `ctcRange` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "ctcRange",
ADD COLUMN     "maxCtc" DOUBLE PRECISION,
ADD COLUMN     "minCtc" DOUBLE PRECISION;
