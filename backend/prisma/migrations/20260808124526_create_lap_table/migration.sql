-- CreateTable
CREATE TABLE "laps" (
    "id" SERIAL NOT NULL,
    "dateStart" TIMESTAMP(3),
    "durationSector1" DOUBLE PRECISION,
    "durationSector2" DOUBLE PRECISION,
    "durationSector3" DOUBLE PRECISION,
    "isPitOutLap" BOOLEAN NOT NULL,
    "lapDuration" DOUBLE PRECISION NOT NULL,
    "lapNumber" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "laps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "laps_driverId_sessionId_lapNumber_key" ON "laps"("driverId", "sessionId", "lapNumber");

-- AddForeignKey
ALTER TABLE "laps" ADD CONSTRAINT "laps_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laps" ADD CONSTRAINT "laps_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
