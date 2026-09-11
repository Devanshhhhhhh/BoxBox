import { Request, Response } from "express";
import prisma from "../config/prisma";

const getResultsBySession = async (req: Request, res: Response) => {
    try{
        const sessionKey = Number(req.params.sessionKey)

        const results = await prisma.result.findMany({
            where: {
                session: {
                    sessionKey: sessionKey
                }
            },
            include: {
                driver: true
            },
            orderBy: {
                position: "asc"
            }
        })

        const formattedResults = results.map((result) => {
            let status = "Finished"

            if(result.dsq){
                status = "DSQ"
            }
            else if(result.dns){
                status = "DNS"
            }
            else if(result.dnf){
                status = "DNF"
            }
            return {
                position: result.position,
                driver: result.driver.fullName,
                team: result.driver.teamName,
                gapToLeader: result.gapToLeader,
                status
        }
        })

        res.status(200).json({
            success: true,
            data: formattedResults
        })

    } catch(error){
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch results",
        })
    }
}

export default getResultsBySession;