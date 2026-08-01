import { getMeetings } from "../services/openf1.service";
import { Request, Response } from "express";

const getAllMeetings = async (req: Request, res: Response) => {
    const meetings = await getMeetings();

    res.status(200).json({
        success : true,
        data : meetings
    })
}

export default getAllMeetings;