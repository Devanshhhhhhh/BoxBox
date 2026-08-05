-- CreateTable
CREATE TABLE "meetings" (
    "id" SERIAL NOT NULL,
    "meetingKey" INTEGER NOT NULL,
    "meetingName" TEXT NOT NULL,
    "officialname" TEXT,
    "countryCode" TEXT,
    "countryName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "circuitShortname" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "sessionKey" INTEGER NOT NULL,
    "sessionName" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "meetingId" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meetings_meetingKey_key" ON "meetings"("meetingKey");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionKey_key" ON "sessions"("sessionKey");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
