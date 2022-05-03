import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { DBENUMS, STATUS_MSG } from "../../../constants";
import UserInviteEntity from "../../../entity/v1/user/user.invite.entity";
import { IUserInvite } from "../../../interfaces/model.interface";
import { sendErrorResponse } from "../../../utils/utils";

export default class UserInviteController {
    static async invitesSent(req: Request, res: Response, next: NextFunction) {
        try {
            const userInvites: IUserInvite[] = await UserInviteEntity.findUserInvites({ invitedBy: req.body.tokenId })
            res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json({ ...STATUS_MSG.SUCCESS.DEFAULT, data: userInvites })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async invitesReceived(req: Request, res: Response, next: NextFunction) {
        try {
            const userInvites: IUserInvite[] = await UserInviteEntity.findUserInvites({ invitedTo: req.body.tokenId });
            res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json({ ...STATUS_MSG.SUCCESS.DEFAULT, data: userInvites })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async acceptInvitation(req: Request, res: Response, next: NextFunction) {
        try {
            const inviteId = new mongoose.Types.ObjectId(req.params.inviteId);
            const userInvite: IUserInvite = await UserInviteEntity.updateUserInviteById(inviteId, { inviteStatus: DBENUMS.INVITE_STATUS[1] });
            res.status(STATUS_MSG.SUCCESS.INVITE_ACCEPTED.statusCode).json({ ...STATUS_MSG.SUCCESS.INVITE_ACCEPTED, data: userInvite });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async declineInvitation(req: Request, res: Response, next: NextFunction) {
        try {
            const inviteId = new mongoose.Types.ObjectId(req.params.inviteId)
            const userInvite: IUserInvite = await UserInviteEntity.updateUserInviteById(inviteId, { inviteStatus: DBENUMS.INVITE_STATUS[2] });
            res.status(STATUS_MSG.SUCCESS.INVITE_DECLINE.statusCode).json({ ...STATUS_MSG.SUCCESS.INVITE_DECLINE, data: userInvite })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}