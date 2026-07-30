import { Request, Response } from "express";
import { getSessions } from "../services/openf1.service";

const getAllSession = async (req: Request, res: Response) => {
    const sessions = await getSessions();

    res.status(200).json({
        success : true,
        data : sessions
    })
}

export default getAllSession;