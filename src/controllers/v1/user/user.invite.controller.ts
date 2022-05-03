import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { DBENUMS, STATUS_MSG } from "../../../constants";
import UserEventEntity from "../../../entity/v1/user/user.event.entity";
import UserInviteEntity from "../../../entity/v1/user/user.invite.entity";
import { IPayment, IUserInvite } from "../../../interfaces/model.interface";
import { bookEvent } from "../../../utils/user.validator";
import { sendErrorResponse } from "../../../utils/utils";

export default class UserInviteController {

    /**
     * @description all the sent invite request of a user
     * @param req 
     * @param res 
     * @param next 
     */
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

    /**
     * @description all the recieved invite request of a user
     * @param req 
     * @param res 
     * @param next 
     */
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

    /**
     * @description acceptin the invite request of a user
     * @param req 
     * @param res 
     * @param next 
     */
    static async acceptInvitation(req: Request, res: Response, next: NextFunction) {
        try {
            const userInviteId = new mongoose.Types.ObjectId(req.params.inviteId);
            const userInvite: IUserInvite = await UserInviteEntity.updateUserInviteById(userInviteId, { inviteStatus: DBENUMS.INVITE_STATUS[1] });
            res.status(STATUS_MSG.SUCCESS.INVITE_ACCEPTED.statusCode).json({ ...STATUS_MSG.SUCCESS.INVITE_ACCEPTED, data: userInvite });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description declining the invite request of a user     y
     * @param req 
     * @param res 
     * @param next 
     */
    static async declineInvitation(req: Request, res: Response, next: NextFunction) {
        try {
            const userInviteId = new mongoose.Types.ObjectId(req.params.inviteId)
            const userInvite: IUserInvite = await UserInviteEntity.updateUserInviteById(userInviteId, { inviteStatus: DBENUMS.INVITE_STATUS[2] });
            res.status(STATUS_MSG.SUCCESS.INVITE_DECLINE.statusCode).json({ ...STATUS_MSG.SUCCESS.INVITE_DECLINE, data: userInvite })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description buying a ticket for an invite (by sender or receiver)
     * @param req 
     * @param res 
     * @param next 
     */
    static async userInviteBuyTicket(req: Request, res: Response, next: NextFunction) {
        try {
            await bookEvent.validateAsync(req.body)
            const paymentId = new mongoose.Types.ObjectId(req.body.paymentId)
            const userInviteId = new mongoose.Types.ObjectId(req.params.userInviteId);

            //  cheking if given paymentId is a valid payment
            const payment: IPayment = await UserEventEntity.paymentDetails(paymentId);

            //  cheking if userInvite exists and updating it
            const userInvite: IUserInvite = await UserInviteEntity.updateUserInviteById(userInviteId, { isBookingDoneForReceiver: true });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}