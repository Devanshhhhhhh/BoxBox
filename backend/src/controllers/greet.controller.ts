import { Request, Response } from "express"

const greetUser = (req : Request, res: Response) : void => {
    const name = req.params.name;

    res.status(200).json({
        message : `Hello ${name}, welcome to BoxBox`
    })
}

export default greetUser;