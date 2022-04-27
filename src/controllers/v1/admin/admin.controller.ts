import { Request, Response, NextFunction } from 'express';
import AdminEntity from '../../../entity/v1/admin/admin.entity'
import { sendErrorResponse } from '../../../utils/utils'

export const adminSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminEntity.adminSignup(req.body);
        res.status(data.statusData.statusCode).setHeader('Token', `${data.token}`).json({ ...data })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminEntity.adminLogin(req.body);
        res.status(data.statusData.statusCode).setHeader('Token', `${data.token}`).json({ ...data })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const adminDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminEntity.adminDetails(req.body.tokenId)
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const reportDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId: any = req.params.reportId
        const data: any = await AdminEntity.reportDetails(reportId);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const reviewReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId: any = req.params.reportId;
        const data: any = await AdminEntity.reviewReport(reportId, req.body);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId
        const data: any = await AdminEntity.deleteUser(userId);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}