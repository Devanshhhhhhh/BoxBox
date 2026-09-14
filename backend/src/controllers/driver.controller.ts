import {Response, Request } from "express"
import { getDrivers } from "../services/openf1.service"
import prisma from "../config/prisma";
import { getLatestRaceSession, getChampionshipDrivers } from "../services/session.service";

// GET DRIVER
const getAllDrivers = async (req: Request, res: Response) => {
    const drivers = await prisma.driver.findMany();

    // Get latest session for drivers standings
    const session = await getLatestRaceSession(2026);
    console.log(session);

    //Get data of the session for drivers standings
    const driversStandings = await getChampionshipDrivers(Number(session?.sessionKey));

    const formattedStandings = driversStandings.map((standing) => {
        const driver = drivers.find(
            (driver) => driver.driverNumber === standing.driver_number
        )

        return {
            position: standing.position_current,
            driverNumber: standing.driver_number,
            driver: driver?.fullName,
            team: driver?.teamName,
            points: standing.points_current
        }
    })
    
    res.status(200).json({
        success: true,
        data: formattedStandings
    })
}


// POST DRIVER
const createDriver = async (req: Request, res: Response) => {
    const driver = await prisma.driver.create({
        data: {
            driverNumber: req.body.driverNumber,
            fullName: req.body.fullName,
            teamName: req.body.teamName,
            countryCode: req.body.countryCode
        }
    })

    res.status(200).json({
        success: true,
        data: driver
    })
}


export { getAllDrivers, createDriver };