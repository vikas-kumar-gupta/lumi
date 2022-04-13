import { STATUS_MSG } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';

import { ISubscription } from '../../../interfaces/model.interface';
import Subscription from '../../../models/admin/admin.subscription.model';
import * as validate from '../../../utils/admin.validator'

export const newSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { subscriptionPlan, subscriptionMonths, price } = req.body
        await validate.newSubscription.validateAsync(req.body)
        const subscription = new Subscription(req.body);
        subscription.save((err, data) => {
            if (err) throw new Error()
            res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).json(STATUS_MSG.SUCCESS.CREATED)
        })
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.DB_ERROR.statusCode).json(STATUS_MSG.ERROR.DB_ERROR)
    }
}

export const updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionId = req.params.subscriptionId
        await validate.updateSubscription.validateAsync(req.body);
        const subscription = await Subscription
    }
    catch (err) {

    }
}

export const deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // to bbe implemented
    }
    catch (err) {

    }
}