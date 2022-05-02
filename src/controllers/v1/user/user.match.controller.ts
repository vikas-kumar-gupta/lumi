import { IUserDetails } from './../../../interfaces/model.interface';
import { CONFIG, STATUS_MSG } from '../../../constants'
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { sendErrorResponse } from '../../../utils/utils'
import UserMatchEntity from '../../../entity/v1/user/user_match.entity';
import UserEntity from '../../../entity/v1/user/user.entity';
import { IReport, IUser } from '../../../interfaces/model.interface';
import * as validate from '../../../utils/user.validator';
import UserDetails from '../../../models/user/user_details.model';

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

    /**
     * @description User profile details
     * @param req 
     * @param res 
     * @param next 
     */
    static async matchProfileDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId)
            const user: IUser = await UserEntity.userData(userId);
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Match profile'), data: user });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description for reporting an user account
     * @param req 
     * @param res 
     * @param next 
     */
    static async reportProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = new mongoose.Types.ObjectId(req.params.userId);
            await validate.reportProfile.validateAsync(req.body)

            // creating new report for the user
            const report: IReport = await UserMatchEntity.newReport({ reasons: req.body.reasons, otherReasons: req.body.otherReasons, reportedBy: req.body.tokenId, reportedTo: userId })

            // increasing the reportNum in reported user profile
            const user: IUser = await UserEntity.updateUserById(userId, { $inc: { reportNum: 1 } })

            // pushing reported account in the users details model
            await UserEntity.updateUserDetailsById(req.body.tokenId, { $push: { reportedUsers: userId } })
            res.status(STATUS_MSG.SUCCESS.REPORTED.statusCode).json(STATUS_MSG.SUCCESS.REPORTED)
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description bloking a user account
     * @param req 
     * @param res 
     * @param next 
     */
    static async blockProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const blockUserId = new mongoose.Types.ObjectId(req.params.userId);

            // cheking if blocking user exist
            const blockedUser: IUser = await UserEntity.findUserById(blockUserId);
            
            const data = await UserMatchEntity.blockProfile(req.body.tokenId, blockedUser._id)
            // const data: IUser = await UserEntity.updateUserDetailsById(req.body.tokenId, { $push: { blockedUsers: blockedUser._id } })
            res.status(STATUS_MSG.SUCCESS.BLOCKED.statusCode).json({ ...STATUS_MSG.SUCCESS.BLOCKED })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description invite a user to an event
     * @param req 
     * @param res 
     * @param next 
     */
    static async matchProfileInviteEvent(req: Request, res: Response, next: NextFunction) {
        try {

        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

}

