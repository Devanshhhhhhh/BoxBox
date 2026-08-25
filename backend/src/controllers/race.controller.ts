import { Request, Response } from "express";
import prisma from "../config/prisma";

const getRaceByMeetingKey = async (req: Request, res: Response) => {
    const meetingKey = Number(req.params.meetingKey)
    const race = await prisma.meeting.findUnique({
        where: {
            meetingKey: meetingKey
        },
        include: {
            sessions: true
        }
    })

    if(!race){
        return res.status(404).json({
            success: false,
            message: "Race not found"
        })
    }

    res.status(200).json({
        success: true,
        data: race
    });
};

export default getRaceByMeetingKey;