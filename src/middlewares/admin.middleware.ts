import { CONFIG, STATUS_MSG } from '../constants'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/utils';

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.headers['authorization']
        const verifyToken: any = jwt.verify(token, CONFIG.JWT_SECRET_KEY)
        if (verifyToken.isAdmin) {
            if (verifyToken.id != undefined) {
                req.body.tokenId = verifyToken.id;
                req.body.userLocation = verifyToken.location
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
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}