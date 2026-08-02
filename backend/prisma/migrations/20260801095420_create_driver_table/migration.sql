-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "driverNumber" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "teamName" TEXT,
    "countryCode" TEXT,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_driverNumber_key" ON "drivers"("driverNumber");
