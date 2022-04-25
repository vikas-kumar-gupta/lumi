import { CONFIG, STATUS_MSG } from '../constants'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/utils'
import { redis } from '../db/redis.config'
import Session from '../models/session.model';
import { ISession } from '../interfaces/model.interface';

export const sessionAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers['authorization']
        const verifyToken: any = jwt.verify(token, CONFIG.JWT_SECRET_KEY)
        if (verifyToken.id != undefined) {

            //  cheking if session exist in rdis
            const redisData = await redis.findSession(verifyToken.id)
            if (!redisData) {      
                    
                //  cheking if session exist in mongoDB
                const session: ISession | null = await Session.findOne({ userId: verifyToken.id, isActive: true })
                if (!session)
                    res.status(400).json(STATUS_MSG.ERROR.SESSION_EXPIRED)
                req.body.tokenId = verifyToken.id;
                next()
            }
            else {
                req.body.tokenId = verifyToken.id;
                next()
            }
        }
        else {
            res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
        }
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}