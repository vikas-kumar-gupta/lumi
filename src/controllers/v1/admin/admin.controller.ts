import { Request, Response, NextFunction } from 'express';
import AdminEntity from '../../../entity/v1/admin/admin.entity'
import { sendErrorResponse } from '../../../utils/utils'
import * as validator from '../../../utils/admin.validator'
import { CONFIG, DBENUMS, STATUS_MSG } from '../../../constants';
import { IAdmin, IUser } from '../../../interfaces/model.interface';
import sessionEntity from '../../../entity/v1/session/session.entity';
import jwt from 'jsonwebtoken'

export default class AdminController {

    /**
     * @description admin signup
     * @param req 
     * @param res 
     * @param next 
     */
    static async adminSignup(req: Request, res: Response, next: NextFunction) {
        try {
            await validator.adminSignup.validateAsync(req.body);
            if (!await AdminEntity.isPhoneNumAlreadyExist((req.body.phoneNumber))) {
                const admin: IAdmin = await AdminEntity.createNewAdmin(req.body)
                await sessionEntity.createSession(admin._id, DBENUMS.USER_TYPE[0]);
                const token = jwt.sign({ id: admin._id, isAdmin: true, location: admin.location }, CONFIG.JWT_SECRET_KEY)
                res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).setHeader('Token', token).json({ token, ...STATUS_MSG.SUCCESS.CREATED })
            }
            else {
                res.status(STATUS_MSG.ERROR.ALREADY_EXIST('').statusCode).json(STATUS_MSG.ERROR.ALREADY_EXIST(req.body.phoneNumber))
            }
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description admin login
     * @param req 
     * @param res 
     * @param next 
     */
    static async adminLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const data: any = await AdminEntity.adminLogin(req.body);
            res.status(data.statusData.statusCode).setHeader('Token', `${data.token}`).json({ ...data })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description admin profile data
     * @param req 
     * @param res 
     * @param next 
     */
    static async adminDetails(req: Request, res: Response, next: NextFunction) {
        try {
            const admin: IAdmin = await AdminEntity.adminDetails(req.body.tokenId)
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Admin profile'), data: admin })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }

    /**
     * @description deleting a user
     * @param req 
     * @param res 
     * @param next 
     */
    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId
            const user: IUser = await AdminEntity.deleteUser(userId);
            res.status(STATUS_MSG.SUCCESS.DELETED.statusCode).json({ ...STATUS_MSG.SUCCESS.DELETED, data: user })
        }
        catch (err) {
            const errData = sendErrorResponse(err);
            res.status(errData.statusCode).json(errData)
        }
    }
}
