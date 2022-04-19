import { CONFIG, STATUS_MSG } from '../constants'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        const verifyToken = jwt.verify(token, CONFIG.JWT_SECRET_KEY, (err: any, data: any) => {
            if (err) {
                throw new Error(err)
            } else {
                if(data.isAdmin) {                    
                    if(data.id != undefined) {                
                        req.body.tokenId = data.id;
                    }
                    else {
                        res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
                    }
                }
                else {
                    res.status(STATUS_MSG.ERROR.UNAUTHORIZED_ADMIN.statusCode).json(STATUS_MSG.ERROR.UNAUTHORIZED_ADMIN)
                }
            }
        })
        next()
    }
    catch (err) {
        console.log('auth error');
        res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
    }
}