/*
  Warnings:

  - You are about to drop the column `coverLetterPath` on the `Job` table. All the data in the column will be lost.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Made the column `source` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `appliedDate` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "coverLetterPath",
ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "source" SET NOT NULL,
ALTER COLUMN "appliedDate" SET NOT NULL;
