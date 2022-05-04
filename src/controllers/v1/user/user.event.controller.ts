import { DBENUMS, STATUS_MSG } from '../../../constants'
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import UserEventEntity from '../../../entity/v1/user/user.event.entity';
import { sendErrorResponse } from '../../../utils/utils'
import { IEvent, IPayment, IUser, IUserEvent, IUserInvite } from '../../../interfaces/model.interface';
import * as validate from '../../../utils/user.validator'
import UserEntity from '../../../entity/v1/user/user.entity';
import UserMatchEntity from '../../../entity/v1/user/user.match.entity';
import UserInviteEntity from '../../../entity/v1/user/user.invite.entity';
const generateUniqueId = require('generate-unique-id')

export default class UserEventController {

    /**
     * @description details of the event
     * @param req 
     * @param res 
     * @param next 
     */
    static async eventDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId = new mongoose.Types.ObjectId(req.params.eventId)
            const event: IEvent = await UserEventEntity.eventDetails(eventId)
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Event'), data: event })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description user booked events (only upcoming or ongoing events)
     * @param req 
     * @param res 
     * @param next 
     */
    static async myEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const events: IUserEvent[] = await UserEventEntity.myEvents(req.body.tokenId);
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('My-Events'), data: events })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description all the users near by upcoming events
     * @param req 
     * @param res 
     * @param next 
     */
    static async allEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const events: IEvent[] = await UserEventEntity.allEvents(req.body.userLocation);
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('All events'), data: events })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description booking an event after completion of payment
     * @param req 
     * @param res 
     * @param next
     */
    static async bookEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await validate.bookEvent.validateAsync(req.body)
            const eventId = new mongoose.Types.ObjectId(req.params.eventId);
            const paymentId = new mongoose.Types.ObjectId(req.body.paymentId)

            //  generating a unique booking code for booking event
            const eventBookingCode = generateUniqueId({
                length: 7,
                useLetters: false
            });

            //  cheking if event exist
            const event: IEvent = await UserEventEntity.eventDetails(eventId);
            if (event.availableTickets >= 1 && event.eventDate) {

                //  cheking if given paymentId is a valid payment
                const payment: IPayment = await UserEventEntity.findPaymentById(paymentId);

                //  booking an event
                const userEvent: IUserEvent = await UserEventEntity.bookEvent({ eventBookingCode: `#${eventBookingCode}`, eventId: eventId, userId: req.body.tokenId, paymentId: paymentId })

                //  chnging the attendee data of the given eventId after booking it
                const updatedEvent: IEvent = await UserEventEntity.updateEventDetails(eventId, { $inc: { availableTickets: -1, bookedTickets: 1 }, $push: { bookedBy: req.body.tokenId } })
                res.status(STATUS_MSG.SUCCESS.BOOKED.statusCode).json({ ...STATUS_MSG.SUCCESS.BOOKED });
            }
            else
                res.status(STATUS_MSG.ERROR.TICKET_NOT_AVAILABLE.statusCode).json({ ...STATUS_MSG.ERROR.TICKET_NOT_AVAILABLE })
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
    static async userInviteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const userEventId = new mongoose.Types.ObjectId(req.params.userEventId)
            const userId = new mongoose.Types.ObjectId(req.params.userId);
            // const eventId = new mongoose.Types.ObjectId(req.params.eventId);
            await validate.inviteEvent.validateAsync(req.body)

            //  cheking if given userId exist
            const user: IUser = await UserEntity.findUserById(userId);

            //  cheking if given userEventId exist
            // const event: IEvent = await UserEventEntity.eventDetails(eventId);
            const userEvent: IUserEvent = await UserEventEntity.userEventDetails(userEventId)

            //  creating new invites
            const userInvite: IUserInvite = await UserInviteEntity.newUserInvite(
                {
                    invitedBy: req.body.tokenId,
                    invitedTo: userId,
                    eventId: userEvent.eventId,
                    inviteType: DBENUMS.INVITE_TYPE[0],
                    isOfferingTicket: req.body.isOfferingTicket
                }
            )
            
            //  adding newly created invite to the existing UserEvent
            await UserEventEntity.updateUserEventById(userEventId, { userInvite: userInvite._id })
            res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json({ ...STATUS_MSG.SUCCESS.DEFAULT })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}

