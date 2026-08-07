/*
  Warnings:

  - A unique constraint covering the columns `[driverId,sessionId]` on the table `results` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "results_driverId_sessionId_key" ON "results"("driverId", "sessionId");
