import { STATUS_MSG, CONFIG } from '../../../constants';
import jwt from 'jsonwebtoken'
import mongoose, { Schema, model } from 'mongoose';
import Admin from '../../../models/admin/admin.model'
import Report from '../../../models/report.model'
import { IAdmin, IReport } from '../../../interfaces/model.interface'
import { adminSignup, adminLogin } from '../../../utils/admin.validator';
import User from '../../../models/user.model';

export default class AdminEntity {

    /**
     * @description check if phone number is already registered
     * @param phoneNumber 
     * @returns boolean
     */
    static async isPhoneNumAlreadyExist(phoneNumber: String): Promise<Boolean> {
        try {
            const user: IAdmin | null = await Admin.findOne({ phoneNumber: phoneNumber })
            if (user) {
                return Promise.resolve(true)
            }
            else {
                return Promise.resolve(false)
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description admin signup
     * @param bodyData 
     * @returns token and status object
     */
    static async adminSignup(bodyData: any): Promise<Object | void> {
        try {
            await adminSignup.validateAsync(bodyData);
            if (!await AdminEntity.isPhoneNumAlreadyExist((bodyData.phoneNumber))) {
                const admin = new Admin(bodyData);
                const data = await admin.save()
                const token = jwt.sign({ id: data._id }, CONFIG.JWT_SECRET_KEY)
                const statusData = STATUS_MSG.SUCCESS.CREATED;
                return Promise.resolve({ token, statusData })
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.ALREADY_EXIST(bodyData.phoneNumber))
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description admin login
     * @param bodyData (phoneNumber, password)
     * @returns token and status object
     */
    static async adminLogin(bodyData: any): Promise<Object | void> {
        try {
            adminLogin.validate(bodyData)
            const admin = await Admin.findOne({ phoneNumber: bodyData.phoneNumber });
            if (admin) {
                if (admin.password == bodyData.password) {
                    const token = jwt.sign({ id: admin._id }, CONFIG.JWT_SECRET_KEY)
                    console.log(token);
                    const statusData = STATUS_MSG.SUCCESS.LOGIN;
                    return Promise.resolve({ token, statusData })
                }
                else {
                    return Promise.reject(STATUS_MSG.ERROR.INCORRECT_CREDENTIALS)
                }
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.INCORRECT_CREDENTIALS)
            }
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
            const report: IReport | null = await Report.findById(new mongoose.Types.ObjectId(reportId.toString()));
            if (report)
                return Promise.resolve(report)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`ReportId: ${reportId}`))
        }
        catch (err: any) {
            return Promise.reject(err)
        }
    }

    /**
     * @description delete an user account
     * @param userId 
     * @returns status obj
     */
    static async deleteUser(userId: any) {
        try {
            const user = await User.findByIdAndDelete(new mongoose.Types.ObjectId(userId));
            if (user)
                return Promise.resolve(STATUS_MSG.SUCCESS.DELETED)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${userId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}
