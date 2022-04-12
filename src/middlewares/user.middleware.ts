import { CONFIG, STATUS_MSG } from '../constants'
import express, { Request, Response, NextFunction, Application } from 'express'
import jwt from 'jsonwebtoken';


export const isLoggedIn = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (token != undefined) {
            const verifyToken = jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err: any, data: any) => {
                if (err) throw new Error(STATUS_MSG.ERROR.TOKEN_EXPIRED.message)
                req.body.tokenId = data._id;   
            })
            next()
        }
        else {
            res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
        }
    }
    catch (err) {
        // res.status(STATUS_MSG.ERROR.INVALID_TOKEN.statusCode).json(STATUS_MSG.ERROR.INVALID_TOKEN)
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const auth = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err: any, data: any) => {
            if (err) {
                throw new Error(err)
            } else {
                if(data._id != undefined) {
                    req.body.tokenId = data._id;
                }
                else {
                    res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
                }
            }
        })
        next();
    }
    catch (err) {
        console.log('auth error');
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}