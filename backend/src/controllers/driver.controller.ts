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


export default getAllDrivers;