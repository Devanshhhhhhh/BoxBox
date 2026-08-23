import { Request, Response } from "express"
import prisma from "../config/prisma"

export const getDashboardData = async (req: Request, res: Response) => {
    try {
        const latestMeeting = await prisma.meeting.findFirst({
            orderBy: {
                year: "desc",
            },
            select: {
                year: true,
            },
        });

        if (!latestMeeting) {
            return res.status(404).json({
                success: false,
                message: "No meetings found",
        });
}

        const currentYear = latestMeeting.year;

        const [totalDrivers, totalSessions, totalRaces, recentRaces] =
         await Promise.all([
            prisma.driver.count(),
            prisma.session.count({
                where: {
                    meeting: {
                        year: currentYear
                    }
                }
            }),

            prisma.meeting.count({
                where: {
                    year: currentYear,
                    meetingName: {
                        not: "Pre-Season Testing"
                    }
                }
            }),

            prisma.meeting.findMany({
                where: {
                    year: currentYear,
                    meetingName: {
                        not: "Pre-Season Testing",
                    },
                },
                orderBy: {
                    dateStart: "desc",
                },
                take: 5
            }),
        ]);

        res.status(200).json({
        success: true,
        data: {
            totalDrivers,
            totalSessions,
            totalRaces,
            recentRaces
      },
    });
} catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
}