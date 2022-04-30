import mongoose from "mongoose"
import { EXCLUDE_DATA, STATUS_MSG } from "../../../constants"
import { IReport, IUser } from "../../../interfaces/model.interface"
import Report from "../../../models/user/report.model"
import User from "../../../models/user/user.model"
import UserDetails from "../../../models/user/user_details.model"
import { reviewReport } from "../../../utils/admin.validator"


export default class AdminReportEntity {

    /**
     * @description list of all reports
     * @returns Report[]
     */
    static async allReports(): Promise<IReport[]> {
        try {
            const reports: IReport[] = await Report.find()
                .sort({ $natural: -1 })
                .populate({
                    path: 'reportedTo reportedBy',
                    select: 'name phoneNumber'
                })
                .select({ ...EXCLUDE_DATA.MONGO })
            return Promise.resolve(reports)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description report details
     * @param reportId 
     * @returns Report
     */
     static async reportDetails(reportId: any): Promise<IReport> {
        try {
            const report: IReport | null = await Report.findById(new mongoose.Types.ObjectId(reportId.toString()))
                .populate({
                    path: 'reportedTo reportedBy',
                    select: 'name phoneNumber'
                })
                .select({ ...EXCLUDE_DATA.MONGO })
            if (report)
                return Promise.resolve(report)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`ReportId: ${reportId}`))
        }
        catch (err: any) {
            return Promise.reject(err)
        }
    }

    /**
     * @description reviewing a report wheather to approve it or not
     * @param reportId 
     * @param bodyData 
     * @returns Report
     */
    static async reviewReport(reportId: any, bodyData: any): Promise<IReport> {
        try {
            await reviewReport.validateAsync(bodyData)
            const report: IReport | null = await Report.findByIdAndUpdate(new mongoose.Types.ObjectId(reportId), { isApproved: bodyData.isApproved }, { new: true })
                .populate({
                    path: 'reportedTo reportedBy',
                    select: 'name phoneNumber'
                })
                .select({ ...EXCLUDE_DATA.MONGO })
            if (report) {
                const user: IUser | null = await User.findByIdAndUpdate(report.reportedTo, { $inc: { reportNum: 1 } })
                if (user) {
                    await UserDetails.findByIdAndUpdate(report.reportedBy, { $push: { reportedUsers: report.reportedTo } })
                    return Promise.resolve(report)
                }
                return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`Reported user: ${report.reportedTo}`))
            }
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`ReportId: ${reportId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}