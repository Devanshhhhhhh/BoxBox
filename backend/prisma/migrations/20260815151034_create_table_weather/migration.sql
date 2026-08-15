-- CreateTable
CREATE TABLE "weathers" (
    "id" SERIAL NOT NULL,
    "airTemperature" DOUBLE PRECISION,
    "trackTemperature" DOUBLE PRECISION,
    "date" TIMESTAMP(3),
    "humidity" INTEGER,
    "pressure" DOUBLE PRECISION,
    "rainfall" INTEGER,
    "windDirection" INTEGER,
    "windSpeed" DOUBLE PRECISION,
    "sessionId" INTEGER NOT NULL,

    CONSTRAINT "weathers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weathers_sessionId_date_key" ON "weathers"("sessionId", "date");

-- AddForeignKey
ALTER TABLE "weathers" ADD CONSTRAINT "weathers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
