import { STATUS_MSG, CONFIG, DBENUMS, EXCLUDE_DATA } from '../../../constants';
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import mongoose, { Schema, model, HydratedDocument } from 'mongoose';
import Admin from '../../../models/admin/admin.model'
import Report from '../../../models/report.model'
import { IAdmin, IReport, IUser } from '../../../interfaces/model.interface'
import { adminSignup, adminLogin } from '../../../utils/admin.validator';
import User from '../../../models/user.model';
import sessionEntity from '../session/session.entity';

export default class AdminEntity {

    /**
     * @description check if phone number is already registered
     * @param phoneNumber 
     * @returns boolean
     */
    static async isPhoneNumAlreadyExist(phoneNumber: String): Promise<Boolean> {
        try {
            const admin: IAdmin | null = await Admin.findOne({ phoneNumber: phoneNumber })
            if (admin)
                return Promise.resolve(true)
            return Promise.resolve(false)
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
    static async adminSignup(bodyData: any): Promise<Object> {
        try {
            await adminSignup.validateAsync(bodyData);
            if (!await AdminEntity.isPhoneNumAlreadyExist((bodyData.phoneNumber))) {
                const admin: HydratedDocument<IAdmin> = new Admin(bodyData);
                const data = await admin.save()
                await sessionEntity.createSession(admin._id, DBENUMS.USER_TYPE[0]);
                const token = jwt.sign({ id: data._id, isAdmin: true }, CONFIG.JWT_SECRET_KEY)
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
    static async adminLogin(bodyData: any): Promise<Object> {
        try {
            adminLogin.validate(bodyData)
            const admin: IAdmin | null = await Admin.findOne({ phoneNumber: bodyData.phoneNumber });
            if (admin) {
                const hashedPassword = md5(bodyData.password)
                if (admin.password == hashedPassword) {
                    await sessionEntity.createSession(admin._id, DBENUMS.USER_TYPE[0]);
                    const token = jwt.sign({ id: admin._id, isAdmin: true }, CONFIG.JWT_SECRET_KEY)
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
     * @description admin profile
     * @param adminId 
     * @returns admin data
     */
    static async adminDetails(adminId: any): Promise<Object> {
        try {
            const admin: IAdmin | null = await Admin.findById(adminId, { ...EXCLUDE_DATA.MONGO, password: 0, isAdmin: 0 });
            if (admin)
                return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Admin profile'), data: admin })
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`AdminId: ${adminId}`));
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
    static async reportDetails(reportId: any): Promise<Object> {
        try {
            const report: IReport | null = await Report.findById(new mongoose.Types.ObjectId(reportId.toString()));
            if (report)
                return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Report details'), data: report })
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
            const user: IUser | null = await User.findByIdAndDelete(new mongoose.Types.ObjectId(userId));
            if (user)
                return Promise.resolve(STATUS_MSG.SUCCESS.DELETED)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${userId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}
