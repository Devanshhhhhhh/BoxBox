import {Response, Request } from "express"
import { getDrivers } from "../services/openf1.service"
import prisma from "../config/prisma";

// GET DRIVER
const getAllDrivers = async (req: Request, res: Response) => {
    const drivers = await prisma.driver.findMany();

    res.status(200).json({
        success: true,
        data: drivers
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