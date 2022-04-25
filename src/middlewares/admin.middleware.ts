import { CONFIG, STATUS_MSG } from '../constants'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers['authorization']
        const verifyToken: any = jwt.verify(token, CONFIG.JWT_SECRET_KEY)
        if (verifyToken.isAdmin) {
            if (verifyToken.id != undefined) {
                req.body.tokenId = verifyToken.id;
            }
            else {
                res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
            }
        }
        else {
            res.status(STATUS_MSG.ERROR.UNAUTHORIZED_ADMIN.statusCode).json(STATUS_MSG.ERROR.UNAUTHORIZED_ADMIN)
        }
        next()
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
    }
}