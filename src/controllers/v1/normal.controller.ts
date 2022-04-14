import { STATUS_MSG } from '../../constants'
import express, { Request, Response, NextFunction } from 'express'

import TestMe from '../../entity/test'

export const homePage = async (req: Request, res: Response, next: NextFunction) => {
    res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT);
}

export const pageNotFound = async (req: Request, res: Response, next: NextFunction) => {
    res.status(STATUS_MSG.ERROR.PAGE_NOT_FOUND.statusCode).json(STATUS_MSG.ERROR.PAGE_NOT_FOUND);
}

export const getFormData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.phoneNumber);
        console.log(req.body);
        
        // res.status(200).json({message: "uploaded successfully"}) 
    }
    catch (err) {
        next(err)
    }
}

export const testMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await TestMe.testMe()
        res.status(200).json({message: data})
    }
    catch (err) {
        res.status(400).json(err)
    }
}