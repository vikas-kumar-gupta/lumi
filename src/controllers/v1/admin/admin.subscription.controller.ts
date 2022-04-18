import { Request, Response, NextFunction } from 'express';
import AdminSubscription from '../../../entity/v1/admin/adminSubscription.entity';
import { sendErrorResponse } from '../../../utils/utils';

export const newSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminSubscription.newSubscription(req.body);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionId = req.params.subscriptionId
        const data: any = await AdminSubscription.updateSubscription(subscriptionId, req.body);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subscriptionId = req.params.subscriptionId
        const data: any = await AdminSubscription.deleteSubscription(subscriptionId, req.body);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}