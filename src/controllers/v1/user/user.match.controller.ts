import { CONFIG, STATUS_MSG, DATE } from '../../../constants'
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../../../models/user.model'
import UserDetails from '../../../models/userDetails.model'
import { sendErrorResponse } from '../../../utils/utils'
import UserMatchEntity from '../../../entity/v1/user/userMatch.entity';
import UserEntity from '../../../entity/v1/user/user.entity';

/**
 * ! matching algorithm to be implemented more accurately
 */
export const mayBeMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await UserMatchEntity.mayBeMatches(req.body.tokenId);
        res.status(data.statusCode).json(data);
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matches = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matchProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId)
        const data: any = await UserEntity.userDetails(userId);
        res.status(data.statusCode).json(data);
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const reportProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const data: any = await UserMatchEntity.reportProfile(req.body.tokenId, userId, req.body)
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const blockProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockUserId = req.params.userId;
        const data: any = await UserMatchEntity.blockProfile( req.body.tokenId, blockUserId)
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matchProfileInviteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}
