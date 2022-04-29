import { STATUS_MSG } from '../../../constants'
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import UserEventEntity from '../../../entity/v1/user/user_event.entity';
import { sendErrorResponse } from '../../../utils/utils'
import { IEvent, IPayment, IUserEvent } from '../../../interfaces/model.interface';
import * as validate from '../../../utils/user.validator'
const generateUniqueId = require('generate-unique-id')

export const eventDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId
        const event: IEvent = await UserEventEntity.eventDetails(eventId)
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Event'), data: event })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const myEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events: IUserEvent[] = await UserEventEntity.myEvents(req.body.tokenId);
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ data: events })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const allEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events: IEvent[] = await UserEventEntity.allEvents(req.body.userLocation);
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('All events'), data: events })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

// ! to be implemented
export const bookEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validate.bookEvent.validateAsync(req.body)
        const eventId = req.params.eventId;
        const paymentId = req.body.paymentId;
        const eventBookingCode = generateUniqueId({
            length: 7,
            useLetters: false
        });
        const event: IEvent = await UserEventEntity.eventDetails(eventId);
        if (event.availableTickets >= 1 && event.eventDate) {
            const payment: IPayment = await UserEventEntity.paymentDetails(paymentId);
            const userEvent: IUserEvent = await UserEventEntity.bookEvent({ eventBookingCode: `#${eventBookingCode}`, eventId: eventId, userId: req.body.tokenId, paymentId: paymentId })
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