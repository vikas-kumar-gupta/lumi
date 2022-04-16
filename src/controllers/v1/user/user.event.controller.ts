import mongoose, { Schema } from 'mongoose';
import { STATUS_MSG } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';

import Event from '../../../models/admin/admin.event.model'
import UserEvent from '../../../models/user_event.model'
import UserEventEntity from '../../../entity/v1/user/userEvent.entity';
import {sendErrorResponse} from '../../../utils/utils'

export const eventDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId: Schema.Types.ObjectId = new Schema.Types.ObjectId(req.params.eventId);
        const event = await UserEventEntity.eventDetails(eventId)
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(event)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const myEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userEvent = await UserEventEntity.myEvents(req.body.tokenId);
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(userEvent)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const allEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await UserEventEntity.allevents();
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(events)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

// ! to be implemented
export const bookEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // booking of an event is to implemented here
    }
    catch (err) {
        
    }
}