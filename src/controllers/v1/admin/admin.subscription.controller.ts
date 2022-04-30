import { subscription } from './../../../utils/user.validator';
import { Request, Response, NextFunction } from 'express';
import AdminSubscription from '../../../entity/v1/admin/admin_subscription.entity';
import { sendErrorResponse } from '../../../utils/utils';
import * as validate from '../../../utils/admin.validator';
import { ISubscription } from '../../../interfaces/model.interface';
import { STATUS_MSG } from '../../../constants';

export default class SubscriptionController {
    
    static async newSubscription(req: Request, res: Response, next: NextFunction) {
        try {
            await validate.newSubscription.validateAsync(req.body);
            const subscription: ISubscription = await AdminSubscription.newSubscription(req.body);
            res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).json({ ...STATUS_MSG.SUCCESS.CREATED, data: subscription });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async updateSubscription(req: Request, res: Response, next: NextFunction) {
        try {
            await validate.updateSubscription.validateAsync(req.body)
            const subscriptionId = req.params.subscriptionId
            const subscription: ISubscription = await AdminSubscription.updateSubscription(subscriptionId, req.body);
            res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json({ ...STATUS_MSG.SUCCESS.UPDATED, data: subscription })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async deleteSubscription(req: Request, res: Response, next: NextFunction) {
        try {
            const subscriptionId = req.params.subscriptionId
            const suscription: ISubscription = await AdminSubscription.deleteSubscription(subscriptionId, req.body);
            res.status(STATUS_MSG.SUCCESS.DELETED.statusCode).json({ ...STATUS_MSG.SUCCESS.DELETED, data: suscription })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}