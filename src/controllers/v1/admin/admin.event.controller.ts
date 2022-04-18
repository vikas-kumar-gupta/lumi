import express, { Request, Response, NextFunction } from 'express';
import AdminEvent from '../../../entity/v1/admin/adminEvent.entity'
import {sendErrorResponse} from '../../../utils/utils'

export const newEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminEvent.newEvent(req.body.tokenId, req.body);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId
        const data: any = await AdminEvent.updateEvent(eventId, req.body);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventId = req.params.eventId
        const data: any = await AdminEvent.deleteEvent(eventId);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}