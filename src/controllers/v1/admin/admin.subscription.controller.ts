import { subscription } from './../../../utils/user.validator';
import { Request, Response, NextFunction } from 'express';
import AdminSubscriptionEntity from '../../../entity/v1/admin/admin_subscription.entity';
import { sendErrorResponse } from '../../../utils/utils';
import * as validate from '../../../utils/admin.validator';
import { ISubscription } from '../../../interfaces/model.interface';
import { STATUS_MSG } from '../../../constants';
import mongoose from 'mongoose';

export default class SubscriptionController {

    static async allSubscriptions(req: Request, res: Response, next: NextFunction) {
        try {
            const subscriptions: ISubscription[] = await AdminSubscriptionEntity.allSubscriptions();
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('all subscriptions'), data: subscriptions });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async subscriptionDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const subscriptionId = new mongoose.Types.ObjectId(req.params.subscriptionId)
            const subscription = await AdminSubscriptionEntity.subscriptionDetails(subscriptionId)
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Subscriptions details'), data: subscription });
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async newSubscription(req: Request, res: Response, next: NextFunction) {
        try {
            await validate.newSubscription.validateAsync(req.body);
            const subscription: ISubscription = await AdminSubscriptionEntity.newSubscription(req.body);
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
            const subscriptionId = new mongoose.Types.ObjectId(req.params.subscriptionId)
            const subscription: ISubscription = await AdminSubscriptionEntity.updateSubscription(subscriptionId, req.body);
            res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json({ ...STATUS_MSG.SUCCESS.UPDATED, data: subscription })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    static async deleteSubscription(req: Request, res: Response, next: NextFunction) {
        try {
            const subscriptionId = new mongoose.Types.ObjectId(req.params.subscriptionId)
            const suscription: ISubscription = await AdminSubscriptionEntity.deleteSubscription(subscriptionId);
            res.status(STATUS_MSG.SUCCESS.DELETED.statusCode).json({ ...STATUS_MSG.SUCCESS.DELETED, data: suscription })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}