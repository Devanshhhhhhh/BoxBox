-- CreateTable
CREATE TABLE "stints" (
    "id" SERIAL NOT NULL,
    "compound" TEXT NOT NULL,
    "lapStart" INTEGER,
    "lapEnd" INTEGER,
    "stintNumber" INTEGER NOT NULL,
    "tyreAge" INTEGER,
    "sessionId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,

    CONSTRAINT "stints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stints_sessionId_driverId_stintNumber_key" ON "stints"("sessionId", "driverId", "stintNumber");

-- AddForeignKey
ALTER TABLE "stints" ADD CONSTRAINT "stints_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stints" ADD CONSTRAINT "stints_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
