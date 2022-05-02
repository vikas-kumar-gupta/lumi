import { EXCLUDE_DATA, STATUS_MSG } from "../../../constants"
import { IReport } from "../../../interfaces/model.interface"
import Report from "../../../models/user/report.model"


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
            const report: IReport | null = await Report.findById(reportId)
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
     * @description update a report by _id
     * @param reportId 
     * @param update 
     * @returns IReport
     */
    static async updateReportById(reportId: any, update: Object): Promise<IReport> {
        try {
            const report: IReport | null = await Report.findByIdAndUpdate(reportId, update, { new: true })
                .populate({
                    path: 'reportedTo reportedBy',
                    select: 'name phoneNumber'
                })
                .select({ ...EXCLUDE_DATA.MONGO });
            if (report)
                return Promise.resolve(report)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`ReportId: ${reportId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}