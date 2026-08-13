import { Request, Response } from "express";
import prisma from "../config/prisma";
import { getDrivers, getMeetings, getSessions, getSessionResults, getLaps, getPits } from "../services/openf1.service";
import { connect } from "node:http2";

// SYNCHRONIZE DRIVERS
export const syncDrivers = async (req: Request, res: Response) => {
    const drivers = await getDrivers();
    let processed = 0;

    for (const driver of drivers) {
        await prisma.driver.upsert({
            where: {
                driverNumber: driver.driver_number
            },
            update: {
                fullName: driver.full_name,
                teamName: driver.team_name,
                countryCode: driver.country_code
            },
            create: {
                driverNumber: driver.driver_number,
                fullName: driver.full_name,
                teamName: driver.team_name,
                countryCode: driver.country_code
            }
        })
        processed++;
    }

    res.status(200).json({
        success: true,
        message: "Driver synchronized succesfully",
        processed: processed
    })
}


// SYNCHRONIZE METTINGS(GP)
export const syncMeetings = async (req: Request, res: Response) => {
    const meetings = await getMeetings();
    // console.log(meetings[0]);
    let processed = 0;

    for (const meeting of meetings) {
        await prisma.meeting.upsert({
            where: {
                meetingKey: meeting.meeting_key
            },
            update: {
                meetingName: meeting.meeting_name,
                officialName: meeting.official_name,
                countryCode: meeting.country_code,
                countryName: meeting.country_name,
                location: meeting.location,
                circuitShortName: meeting.circuit_short_name,
                circuitImage: meeting.circuit_image,
                dateStart: new Date(meeting.date_start),
                dateEnd: new Date(meeting.date_end),
                year: meeting.year
            },
            create: {
                meetingKey: meeting.meeting_key,
                meetingName: meeting.meeting_name,
                officialName: meeting.official_name,
                countryCode: meeting.country_code,
                countryName: meeting.country_name,
                location: meeting.location,
                circuitShortName: meeting.circuit_short_name,
                circuitImage: meeting.circuit_image,
                dateStart: new Date(meeting.date_start),
                dateEnd: new Date(meeting.date_end),
                year: meeting.year
            }
        })
        processed++;
    }

    res.status(200).json({
        success: true,
        message: "Meetings synchronized successfully",
        processed: processed
    })
}

// SYNCHRONIZE SESSIONS(specific race type(sprint, FP1))

export const syncSessions = async (req: Request, res: Response) => {
    const sessions = await getSessions();
    let processed = 0;

    for (const session of sessions) {
        const meeting = await prisma.meeting.findUnique({
            where: {
                meetingKey: session.meeting_key
            }
        })

        if (!meeting) {     // No meeting exist, skip upsert
            continue;
        }

        await prisma.session.upsert({
            where: {
                sessionKey: session.session_key
            },
            update: {
                sessionName: session.session_name,
                sessionType: session.session_type,
                dateStart: new Date(session.date_start),
                dateEnd: new Date(session.date_end),
                meetingId: meeting.id
            },
            create: {
                sessionKey: session.session_key,
                sessionName: session.session_name,
                sessionType: session.session_type,
                dateStart: new Date(session.date_start),
                dateEnd: new Date(session.date_end),
                meetingId: meeting.id
            }
        })
        processed++;
    }

    res.status(200).json({
        success: true,
        message: "Sessions synchronized successfully",
        processed: processed
    })
}

// SYNCHRONIZE RESULTS
export const syncResults = async (req: Request, res: Response) => {
    const sessions = await prisma.session.findMany();
    let processed = 0;

    for (const session of sessions) {
        const results = await getSessionResults(session.sessionKey);
        console.log(results);
        for (const result of results) {
            const driver = await prisma.driver.findUnique({
                where: {
                    driverNumber: result.driver_number
                }
            })

            if (!driver) {
                continue;
            }

            await prisma.result.upsert({
                where: {
                    driverId_sessionId: {
                        driverId: driver.id,
                        sessionId: session.id
                    }
                },
                update: {
                    position: result.position ?? null,
                    duration: result.duration ?? null,
                    gapToLeader: result.gap_to_leader ?? null,
                    numberOfLaps: result.number_of_laps ?? null,
                    dnf: result.dnf ?? false,
                    dns: result.dns ?? false,
                    dsq: result.dsq ?? false
                },
                create: {
                    position: result.position ?? null,
                    duration: result.duration ?? null,
                    gapToLeader: result.gap_to_leader ?? null,
                    numberOfLaps: result.number_of_laps ?? null,
                    dnf: result.dnf ?? false,
                    dns: result.dns ?? false,
                    dsq: result.dsq ?? false,
                    driverId: driver.id,
                    sessionId: session.id
                }
            })

            processed++;
        }
    }
    res.status(200).json({
        success: true,
        message: "Results synchronized successfully",
        processed: processed
    })
}


// SYNC LAPS
export const syncLaps = async (req: Request, res: Response) => {
    const sessions = await prisma.session.findMany();

    let processed = 0;

    for(const session of sessions){
        let laps;

        try{
            laps = await getLaps(session.sessionKey);

        } catch(error){
            console.log(`No laps available for session ${session.sessionKey}`)
            continue;
        }

        for(const lap of laps){
            const driver = await prisma.driver.findUnique({
                where: {
                    driverNumber : lap.driver_number
                }
            })

            if(!driver){
                continue;
            }

            await prisma.lap.upsert({
                where: {
                    driverId_sessionId_lapNumber: {
                        driverId: driver.id,
                        sessionId: session.id,
                        lapNumber: lap.lap_number
                    }
                },
                update: {
                    dateStart: lap.date_start,

                    durationSector1: lap.duration_sector_1 ?? null,
                    durationSector2: lap.duration_sector_2 ?? null,
                    durationSector3: lap.duration_sector_3 ?? null,

                    isPitOutLap: lap.is_pit_out_lap,
                    lapDuration: lap.lap_duration ?? null,
                },
                create: {
                    dateStart: lap.date_start,

                    durationSector1: lap.duration_sector_1 ?? null,
                    durationSector2: lap.duration_sector_2 ?? null,
                    durationSector3: lap.duration_sector_3 ?? null,

                    isPitOutLap: lap.is_pit_out_lap,
                    lapDuration: lap.lap_duration ?? null,
                    lapNumber: lap.lap_number,

                    driver: { connect: { id: driver.id } },
                    session: { connect: { id: session.id } }
                }
            })
            processed++;
        }
    }
    res.status(200).json({
        success: true,
        message: "Laps synchronized successfully",
        processed: processed
    })
}

// SYNC PITS
export const syncPits = async (req: Request, res: Response) => {
    const sessions = await prisma.session.findMany();
    let processed = 0;
    
    for(const session of sessions){
        let pits;
        try {
            pits = await getPits(session.sessionKey);
        } catch(error){
            console.log(`No laps available for session ${session.sessionKey}`)
            continue;
        }

        for(const pit of pits){
            const driver = await prisma.driver.findUnique({
                where: {
                    driverNumber: pit.driver_number
                }
            })

            if(!driver){
                continue;
            }

            await prisma.pit.upsert({
                where: {
                    driverId_sessionId_lapNumber: {
                        driverId: driver.id,
                        sessionId: session.id,
                        lapNumber: pit.lap_number
                    }
                },
                update: {
                    date: new Date(pit.date),

                    laneDuration: pit.lane_duration,
                    stopDuration: pit.stop_duration,
                },
                create: {
                    date: new Date(pit.date),

                    lapNumber: pit.lap_number,
                    laneDuration: pit.lane_duration,
                    stopDuration: pit.stop_duration,
                    
                    driver: {connect: { id: driver.id }},
                    session: {connect: {id: session.id}}
                }
            })
            
            processed++;
        }
    }

    res.status(200).json({
        success: true,
        message: "Pits synchronized succesfully",
        processed: processed
    })
}