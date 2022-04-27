import { STATUS_MSG } from '../../../constants'
import { Request, Response, NextFunction } from 'express';

import UserEventEntity from '../../../entity/v1/user/userEvent.entity';
import { sendErrorResponse } from '../../../utils/utils'
import { IEvent, IUserEvent } from '../../../interfaces/model.interface';

export const eventDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId
        const data: any = await UserEventEntity.eventDetails(eventId)
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const myEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await UserEventEntity.myEvents(req.body.tokenId);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const allEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await UserEventEntity.allEvents(req.body.userLocation);
        res.status(data.statusCode).json(data)
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
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}