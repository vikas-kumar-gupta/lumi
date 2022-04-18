import { STATUS_MSG } from '../../../constants';
import mongoose, { Schema, model} from 'mongoose';
import Admin from '../../../models/admin/admin.model'
import Report from '../../../models/report.model'
import { IReport } from '../../../interfaces/model.interface'

export default class AdminEntity {

    /**
     * @description report details
     * @param reportId 
     * @returns Report
     */
    static async reportDetails(reportId: any): Promise<IReport> {
        try {
            const report: IReport | null = await Report.findById(reportId);
            if (report)
                return Promise.resolve(report)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`ReportId: ${reportId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    
}
