import { Request, Response } from "express";
import prisma from "../config/prisma";
import { getDrivers, getMeetings, getSessions } from "../services/openf1.service";

// SYNCHRONIZE DRIVERS
export const syncDrivers = async (req: Request, res: Response) => {
    const drivers = await getDrivers();
    let processed = 0;

    for(const driver of drivers){
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
                driverNumber : driver.driver_number,
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

    for(const meeting of meetings){
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

    for(const session of sessions){
        const meeting = await prisma.meeting.findUnique({
            where: {
                meetingKey: session.meeting_key
            }
        })

        if(!meeting) {     // No meeting exist, skip upsert
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