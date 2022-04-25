import { CONFIG, STATUS_MSG } from '../constants'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/utils'
import { redis } from '../db/redis.config'

export const sessionAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers['authorization']
        const verifyToken: any = jwt.verify(token, CONFIG.JWT_SECRET_KEY)
        if (verifyToken.id != undefined) {
            const redisData = await redis.findSession(verifyToken.id)
            if (!redisData)
                res.status(400).json(STATUS_MSG.ERROR.SESSION_EXPIRED)
            req.body.tokenId = verifyToken.id;
            next()
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