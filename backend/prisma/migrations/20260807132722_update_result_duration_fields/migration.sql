/*
  Warnings:

  - The `duration` column on the `results` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gapToLeader` column on the `results` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "results" DROP COLUMN "duration",
ADD COLUMN     "duration" JSONB,
DROP COLUMN "gapToLeader",
ADD COLUMN     "gapToLeader" JSONB;
