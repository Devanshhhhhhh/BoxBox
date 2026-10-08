import { Request, Response} from "express";
import { getLocationChunk } from "../services/replay/location.service";
import { createTimeChunks } from "../utils/replay/chunk.utils";
import { runSequentially } from "../utils/replay/request.scheduler";

export const getLocationChunkController = async (req: Request, res: Response) => {
    const sessionKey = Number(req.params.sessionKey);
    const {start, end} = req.query;

    if (!Number.isInteger(sessionKey) || sessionKey <= 0 || typeof start !== "string" || typeof end !== "string") {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey, start, and end query parameters are required"
        });
    }

    try{
        const timeChunks = createTimeChunks(start, end, 5);

        const tasks = timeChunks.map(({start: chunkStart, end: chunkEnd}) => 
            () => getLocationChunk(sessionKey, chunkStart, chunkEnd)
        )
        const locationDataChunks = await runSequentially(tasks);
        const locationData = locationDataChunks.flat();

        return res.status(200).json({
            success: true,
            data: locationData
        })
    } catch(error){
        if (error instanceof RangeError) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        console.error("Failed to fetch replay location data", {
            sessionKey,
            start,
            end,
            error
        });

        return res.status(500).json({
            success: false,
            message: "Failed to fetch location data"
        })
    }
}