import {Response, Request } from "express"
import { getDrivers } from "../services/openf1.service"

const getAllDrivers = async (req: Request, res: Response) => {
    const drivers = await getDrivers();

    res.status(200).json({
        success: true,
        data: drivers
    })
}

export default getAllDrivers;