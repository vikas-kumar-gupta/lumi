import { STATUS_MSG } from '../../../constants'
import { Request, Response, NextFunction } from 'express';
import AdminEntity from '../../../entity/v1/admin/admin.entity'
import { sendErrorResponse } from '../../../utils/utils'

export const adminSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminEntity.adminSignup(req.body);
        const token = data.token
        const statusData = data.statusData
        res.status(data.statusData.statusCode).json({ token: token, statusData: statusData })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await AdminEntity.adminLogin(req.body);

        const token = data.token
        const statusData = data.statusData
        res.status(data.statusData.statusCode).json({ token: token, statusData: statusData })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const reportDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reportId: any = req.params.reportId
        const report = await AdminEntity.reportDetails(reportId);
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(report)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

// ! to be implemented
export const reviewReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //  to be implemented
    }
    catch (err) {

    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId
        const data = await AdminEntity.deleteUser(userId);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}