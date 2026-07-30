import { Request, Response } from "express";

const getHealth = (req: Request, res: Response) : void => {
    res.status(200).json({
        success : true,
        message : "BoxBox API is running"
    })
}

export default getHealth;