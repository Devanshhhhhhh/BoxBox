import { Request, Response} from "express";
import { createTimeChunks } from "../utils/replay/chunk.utils";
import { runSequentially } from "../utils/replay/request.scheduler";
import prisma from "../config/prisma";
import { scheduleRequest } from "../utils/replay/request.scheduler";
import { OpenF1Error } from "../utils/replay/openf1-error";

import { getLocationChunk } from "../services/replay/location.service";
import { getPositionData } from "../services/replay/position.service";
import { getPitData } from "../services/replay/pit.service";
import { getLapsData } from "../services/replay/laps.service";

const getValidSessionKey = (value: string): number | null => {
    const sessionKey = Number(value);

    if (!Number.isInteger(sessionKey) || sessionKey <= 0) {
        return null;
    }

    return sessionKey;
};

// LOCATION CONTROLLER
export const getLocationChunkController = async (
    req: Request,
    res: Response
) => {
    const rawSessionKey = req.params.sessionKey;

    if (typeof rawSessionKey !== "string") {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    const sessionKey = getValidSessionKey(rawSessionKey);

    if (sessionKey === null) {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    try {
        // 1. Find the session in our database
        const session = await prisma.session.findUnique({
            where: { sessionKey }
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        // 2. Allow only the main Grand Prix race
        if (session.sessionType.toLowerCase() !== "race") {
            return res.status(400).json({
                success: false,
                message: "Replay is available only for race sessions"
            });
        }

        // 3. A complete time range is required
        if (!session.dateEnd) {
            return res.status(400).json({
                success: false,
                message: "Race session end time is not available"
            });
        }

        // 4. Convert database dates into ISO strings and split into chunks
        const timeChunks = createTimeChunks(
            session.dateStart.toISOString(),
            session.dateEnd.toISOString(),
            5
        );

        // 5. Create deferred tasks so requests run through the scheduler
        const tasks = timeChunks.map(
            ({ start, end }, index) => async () => {
                console.log(
                    `Fetching chunk ${index + 1}/${timeChunks.length}`,
                    { sessionKey, start, end }
                );

                return getLocationChunk(sessionKey, start, end);
            }
        );

        // 6. Fetch sequentially and combine all chunks
        const locationData = [];

        for (const task of tasks) {
            try {
                const chunkData = await scheduleRequest(task);
                locationData.push(...chunkData);
            } catch (error) {
                if (
                    error instanceof OpenF1Error &&
                    error.status === 404 &&
                    error.message === "No location records for this chunk"
                ) {
                    console.log(
                        "No location records found. Stopping extraction.",
                        { sessionKey }
                    );

                    break;
                }

                throw error;
            }
        }

        return res.status(200).json({
            success: true,
            data: locationData
        });
    } catch (error) {
        if (error instanceof RangeError) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        console.error("Failed to fetch replay location data", {
            sessionKey,
            error
        });

        return res.status(500).json({
            success: false,
            message: "Failed to fetch location data"
        });
    }
};

// POSITION CONTROLLER
export const getPositionController = async (req: Request, res: Response) => {
    console.log("POSITION CONTROLLER HIT");
    const rawSessionKey = req.params.sessionKey;
    
    if (typeof rawSessionKey !== "string") {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }
    const sessionKey = getValidSessionKey(rawSessionKey);

    if (sessionKey === null) {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    try {
        const positionData = await getPositionData(sessionKey);

        return res.status(200).json({
            success: true,
            data: positionData
        });
    } catch (error) {
        console.error("Failed to fetch replay position data", {
            sessionKey,
            error
        });

        return res.status(500).json({
            success: false,
            message: "Failed to fetch position data"
        });
    }
};


// LAPS CONTROLLER
export const getLapsController = async (req: Request,res: Response) => {
    console.log("LAP CONTROLLER HIT");
    const rawSessionKey = req.params.sessionKey;

    if (typeof rawSessionKey !== "string") {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    const sessionKey = getValidSessionKey(rawSessionKey);

    if (sessionKey === null) {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    try {
        const lapsData = await getLapsData(sessionKey);

        return res.status(200).json({
            success: true,
            data: lapsData
        });
    } catch (error) {
        console.error("Failed to fetch replay laps data", {
            sessionKey,
            error
        });

        return res.status(500).json({
            success: false,
            message: "Failed to fetch laps data"
        });
    }
};


//PIT CONTROLLER

export const getPitController = async (
    req: Request,
    res: Response
) => {
    console.log("PIT CONTROLLER HIT");
    const rawSessionKey = req.params.sessionKey;

    if (typeof rawSessionKey !== "string") {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    const sessionKey = getValidSessionKey(rawSessionKey);

    if (sessionKey === null) {
        return res.status(400).json({
            success: false,
            message: "A valid sessionKey is required"
        });
    }

    try {
        const pitData = await getPitData(sessionKey);

        return res.status(200).json({
            success: true,
            data: pitData
        });
    } catch (error) {
        console.error("Failed to fetch replay pit data", {
            sessionKey,
            error
        });

        return res.status(500).json({
            success: false,
            message: "Failed to fetch pit data"
        });
    }
};
