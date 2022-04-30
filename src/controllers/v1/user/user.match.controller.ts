import { CONFIG, STATUS_MSG } from '../../../constants'
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { sendErrorResponse } from '../../../utils/utils'
import UserMatchEntity from '../../../entity/v1/user/user_match.entity';
import UserEntity from '../../../entity/v1/user/user.entity';
import { IReport, IUser } from '../../../interfaces/model.interface';
import * as validate from '../../../utils/user.validator';

export default class UserMatchController {
    /**
     * ! matching algorithm to be implemented more accurately
     */
    static async mayBeMatches(req: Request, res: Response, next: NextFunction) {
        try {
            const matches: IUser[] = await UserMatchEntity.mayBeMatches(req.body.tokenId, req.body.userLocation);
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Match profile'), data: matches });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async matchProfileDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId)
            const user: IUser = await UserEntity.userDetails(userId);
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Match profile'), data: user });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async reportProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            await validate.reportProfile.validateAsync(req.body)
            const user: IUser = await UserEntity.updateUserById(new mongoose.Types.ObjectId(userId), { $inc: { reportNum: 1 } })
            const report: IReport = await UserMatchEntity.reportProfile({ reasons: req.body.reasons, otherReasons: req.body.otherReasons, reportedBy: req.body.tokenId, reportedTo: userId }, req.body.tokenId, userId)
            res.status(STATUS_MSG.SUCCESS.REPORTED.statusCode).json(STATUS_MSG.SUCCESS.REPORTED)
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async blockProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const blockUserId = req.params.userId;
            const data: any = await UserMatchEntity.blockProfile(req.body.tokenId, blockUserId)
            res.status(data.statusCode).json(data)
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async matchProfileInviteEvent(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

}

