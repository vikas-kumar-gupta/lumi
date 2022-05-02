import { STATUS_MSG } from './../../../constants/app.constants';
import { Request, Response, NextFunction } from 'express';
import AdminEventEntity from '../../../entity/v1/admin/admin_event.entity'
import { sendErrorResponse } from '../../../utils/utils'
import * as validate from '../../../utils/admin.validator'
import { IEvent } from '../../../interfaces/model.interface';
import mongoose from 'mongoose';

export default class AdminEventController {

    /**
     * @description creating a new event
     * @param req 
     * @param res 
     * @param next 
     */
    static async newEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await validate.newEvent.validateAsync({ createdBy: req.body.tokenId, ...req.body })
            const event: IEvent = await AdminEventEntity.newEvent({ createdBy: req.body.tokenId, ...req.body });
            res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).json({ ...STATUS_MSG.SUCCESS.CREATED, data: event })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description updating an existing event
     * @param req 
     * @param res 
     * @param next 
     */
    static async updateEvent(req: Request, res: Response, next: NextFunction) {
        try {
            await validate.updateEvent.validateAsync(req.body)
            const eventId = new mongoose.Types.ObjectId(req.params.eventId)
            const event: IEvent = await AdminEventEntity.updateEvent(eventId, req.body);
            res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json({ ...STATUS_MSG.SUCCESS.UPDATED, data: event })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description deleting an event of eventId
     * @param req 
     * @param res 
     * @param next 
     */
    static async deleteEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const eventId = new mongoose.Types.ObjectId(req.params.eventId)
            const event: IEvent = await AdminEventEntity.deleteEvent(eventId);
            res.status(STATUS_MSG.SUCCESS.DELETED.statusCode).json({ data: event })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}