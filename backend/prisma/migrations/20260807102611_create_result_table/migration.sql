-- CreateTable
CREATE TABLE "results" (
    "id" SERIAL NOT NULL,
    "position" INTEGER NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "gapToLeader" DOUBLE PRECISION NOT NULL,
    "numberOfLaps" INTEGER NOT NULL,
    "dnf" BOOLEAN NOT NULL,
    "dns" BOOLEAN NOT NULL,
    "dsq" BOOLEAN NOT NULL,
    "driverId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
