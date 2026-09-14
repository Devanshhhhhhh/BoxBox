import prisma from "../config/prisma";

export const getLatestRaceSession = async (year: number) => {
    const session = await prisma.session.findFirst({
        where: {
            sessionName: "Race",
            dateStart: {
                lte: new Date()
            },
            meeting: {
                year: year
            }
        },
        orderBy: {
            dateStart: "desc"
        }
    });

    return session;
};


type ChampionshipDriver = {
    driver_number: number;
    meeting_key: number;
    session_key: number;
    position_start: number;
    position_current: number;
    points_start: number;
    points_current: number;
};

export const getChampionshipDrivers = async (sessionKey: number): Promise<ChampionshipDriver[]> => {
    const response = await fetch(`https://api.openf1.org/v1/championship_drivers?session_key=${sessionKey}`)
    const data : ChampionshipDriver[] = await response.json();

    return data;
}