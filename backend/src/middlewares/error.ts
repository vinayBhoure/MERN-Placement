import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/class.js";
import { ControllerType } from "../types/types.js";

export const globalCatch = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction) => {

        err.message = err.message || "Internal server error";
        err.statusCode = err.statusCode || 500;

        return res.status(err.statusCode).json({
            success: false,
            error: err.message
        })

     }

export const TryCatch = (func: ControllerType) => {
    return (req:Request, res:Response, next:NextFunction) => {
        return Promise.resolve(func(req,res,next)).catch(next)
    }
}
