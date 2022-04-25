import { STATUS_MSG, CONFIG } from '../../constants'
import { Request, Response, NextFunction } from 'express'
import { sendErrorResponse } from '../../utils/utils'
import jwt from 'jsonwebtoken'

export const homePage = async (req: Request, res: Response, next: NextFunction) => {
    res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT);
}

export const pageNotFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(STATUS_MSG.ERROR.PAGE_NOT_FOUND);
}

// ! function for testing purpose
export const getFormData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(req.body)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData);
    }
}
