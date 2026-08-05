import { Request, Response } from "express";
import { getDrivers } from "../services/openf1.service";
import prisma from "../config/prisma";

const syncDrivers = async (req: Request, res: Response) => {
    const drivers = await getDrivers();
    let processed = 0;
    let created = 0;
    let updated = 0;

    for(const driver of drivers){
        await prisma.driver.upsert({
            where: {
                driverNumber: driver.driver_number
            },
            update: {
                fullName: driver.full_name,
                teamName: driver.team_name,
                countryCode: driver.country_code
            },
            create: {
                driverNumber : driver.driver_number,
                fullName: driver.full_name,
                teamName: driver.team_name,
                countryCode: driver.country_code
            }
        })
        processed++;
    }
    
    res.status(200).json({
        success: true,
        message: "Driver synchronized succesfully",
        processed: processed,
        created: created,
        updated: updated
    })
}

export default syncDrivers;