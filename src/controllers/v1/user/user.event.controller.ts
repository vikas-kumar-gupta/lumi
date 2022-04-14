import { STATUS_MSG } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';

import Event from '../../../models/admin/admin.event.model'
import UserEvent from '../../../models/user_event.model'
import UserEventEntity from '../../../entity/v1/user/userEvent.entity';

export const eventDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // here user registered event will be displayed
        const eventId = req.params.eventId
        const event = await Event.findById(eventId)
        if(event) {
            res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(event)
        } else {
            res.status(STATUS_MSG.ERROR.NOT_EXIST('').statusCode).json(STATUS_MSG.ERROR.NOT_EXIST('Invalid  event-id || Event does not exist'));
        }
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const myEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userEvents = await UserEvent.find({userId: req.body.tokenId});
        res.status(200).json(userEvents);
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const allEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await Event.find();
        if (events != undefined) res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS("").statusCode).json(events)
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while fetching events'))
    }
}

export const bookEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // booking of an event is to implemented here
    }
    catch (err) {
        
    }
}