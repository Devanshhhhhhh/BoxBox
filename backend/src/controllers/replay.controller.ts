import { Request, Response} from "express";
import { getLocationChunk } from "../services/replay/location.service";

export const getLocationChunkController = async (req: Request, res: Response) => {
    const sessionKey = Number(req.params.sessionKey);
    const {start, end} = req.query;

    if (typeof start !== "string" || typeof end !== "string") {
        return res.status(400).json({
            success: false,
            message: "start and end query parameters are required"
        });
    }

    try{
        const locationData = await getLocationChunk(sessionKey, start, end);

        return res.status(200).json({
            success: true,
            data: locationData
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Failed to fetch location data"
        })
    }
}