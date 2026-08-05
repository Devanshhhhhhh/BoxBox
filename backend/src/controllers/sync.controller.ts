import { Request, Response } from "express";
import prisma from "../config/prisma";
import { getDrivers } from "../services/openf1.service";
import { getMeetings } from "../services/openf1.service";

// SYNCHRONIZE DRIVERS
export const syncDrivers = async (req: Request, res: Response) => {
    const drivers = await getDrivers();
    let processed = 0;
    let created = 0;
    let updated = 0;

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