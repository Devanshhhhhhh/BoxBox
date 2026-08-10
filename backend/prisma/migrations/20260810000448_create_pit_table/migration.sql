-- CreateTable
CREATE TABLE "pits" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "lapNumber" INTEGER NOT NULL,
    "laneDuration" DOUBLE PRECISION,
    "stopDuration" DOUBLE PRECISION,
    "sessionId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "pits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pits_driverId_sessionId_lapNumber_key" ON "pits"("driverId", "sessionId", "lapNumber");

-- AddForeignKey
ALTER TABLE "pits" ADD CONSTRAINT "pits_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pits" ADD CONSTRAINT "pits_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
