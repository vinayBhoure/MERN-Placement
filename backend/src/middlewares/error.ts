import { NextFunction, Request, Response } from "express";

export const globalCatch = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {

    
        return res.status(500).json({
            success: false,
            error: err.message
        })

     }