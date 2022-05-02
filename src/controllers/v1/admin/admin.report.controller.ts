import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { STATUS_MSG } from "../../../constants";
import AdminReportEntity from "../../../entity/v1/admin/admin.report.entity";
import { IReport } from "../../../interfaces/model.interface";
import { reviewReport } from "../../../utils/admin.validator";
import { sendErrorResponse } from "../../../utils/utils";


export default class AdminReportController {

    /**
     * @description list of reports
     * @param req 
     * @param res 
     * @param next 
     */
    static async allReports(req: Request, res: Response, next: NextFunction) {
        try {
            const reports: IReport[] = await AdminReportEntity.allReports();
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('All reports'), data: reports })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description report details of reportId
     * @param req 
     * @param res 
     * @param next 
     */
    static async reportDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const reportId = new mongoose.Types.ObjectId(req.params.reportId)
            const report: IReport = await AdminReportEntity.reportDetails(reportId);
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Report details'), data: report })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description admin can review the report by approvinf it or disapproving it
     * @param req 
     * @param res 
     * @param next 
     */
    static async reviewReport(req: Request, res: Response, next: NextFunction) {
        try {
            await reviewReport.validateAsync(req.body)
            const reportId = new mongoose.Types.ObjectId(req.params.reportId);
            const report: IReport = await AdminReportEntity.updateReportById(reportId, { isApproved: req.body.isApproved });
            res.status(STATUS_MSG.SUCCESS.REPORTED.statusCode).json({ ...STATUS_MSG.SUCCESS.REPORTED, data: report })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

}