import { STATUS_MSG } from '../../constants'
import express, { Request, Response, NextFunction } from 'express'

export const homePage = async (req: Request, res: Response, next: NextFunction) => {
    res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT);
}

export const pageNotFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(STATUS_MSG.ERROR.PAGE_NOT_FOUND);
}