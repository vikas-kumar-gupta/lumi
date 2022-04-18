import { STATUS_MSG } from '../../../constants'
import mongoose, { Schema, model } from 'mongoose'
import express, { Request, Response, NextFunction } from 'express';
import AdminEntity from '../../../entity/v1/admin/admin.entity'
import { sendErrorResponse } from '../../../utils/utils'

export const reportDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.params.reportId);
        
        // const reportId: Schema.Types.ObjectId = new Schema.Types.ObjectId(req.params.reportId);
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

// ! to be implemented
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //  to be implemented
    }
    catch (err) {

    }
}