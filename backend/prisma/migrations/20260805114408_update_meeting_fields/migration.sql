/*
  Warnings:

  - You are about to drop the column `circuitShortname` on the `meetings` table. All the data in the column will be lost.
  - You are about to drop the column `officialname` on the `meetings` table. All the data in the column will be lost.
  - Added the required column `circuitShortName` to the `meetings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateStart` to the `meetings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meetings" DROP COLUMN "circuitShortname",
DROP COLUMN "officialname",
ADD COLUMN     "circuitImage" TEXT,
ADD COLUMN     "circuitShortName" TEXT NOT NULL,
ADD COLUMN     "dateEnd" TIMESTAMP(3),
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "officialName" TEXT;
