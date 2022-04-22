import { CONFIG, STATUS_MSG } from '../constants'
import express, { Request, Response, NextFunction, Application } from 'express'
import jwt from 'jsonwebtoken';


export const sessionAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers['authorization']
        const verifyToken = jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err: any, data: any) => {
            if (err) {
                throw new Error(err)
            } else {
                if(data.id != undefined) {                
                    req.body.tokenId = data.id;
                }
                else {
                    res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
                }
            }
        })
    }
    catch (err) {

    }
}