import { IBooking, IUser, IUserDetails } from './../../../interfaces/model.interface';
import { CONFIG, STATUS_MSG, DBENUMS } from "../../../constants"
import User from '../../../models/user.model';
import UserDetails from "../../../models/userDetails.model";
import Booking from '../../../models/booking.model'
import * as validate from '../../../utils/user.validator'
import { Schema, HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../../services/nodemailer/email.service';
import sessionEntity from '../session/session.entity';

export default class UserEntity {

    /**
     * @description generate new token
     * @param id 
     * @returns tken string
     */
    static async generateTokenFor(id: Schema.Types.ObjectId): Promise<String> {
        try {
            const token = jwt.sign({ id: id }, CONFIG.JWT_SECRET_KEY)
            return Promise.resolve(token)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description check if phone number is already registered
     * @param phoneNumber 
     * @returns boolean
     */
    static async isPhoneNumAlreadyExist(phoneNumber: String): Promise<Boolean> {
        try {
            const user: IUser | null = await User.findOne({ phoneNumber: phoneNumber })
            if (user)
                return Promise.resolve(true)
            return Promise.resolve(false)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description create a new user
     * @param otpData 
     * @param phoneNumber 
     * @returns Object of status response
     */
    static async newUser(otpData: any, phoneNumber: String, loginType: String): Promise<void | Object> {
        try {
            if (otpData.status == 'approved' && otpData.status != undefined) {
                if (!await UserEntity.isPhoneNumAlreadyExist(phoneNumber)) {
                    const user: HydratedDocument<IUser> = new User({ phoneNumber: phoneNumber, isPhoneVerified: true, loginType: loginType });
                    await user.save()
                    const userDetails: HydratedDocument<IUserDetails> = new UserDetails({ _id: user._id });
                    await userDetails.save()
                    await sessionEntity.createSession(user._id, DBENUMS.USER_TYPE[1]);
                    const token = jwt.sign({ id: userDetails._id, isAdmin: false }, CONFIG.JWT_SECRET_KEY);
                    console.log(token);
                    const statusData = STATUS_MSG.SUCCESS.CREATED;
                    return Promise.resolve({ token, statusData });
                }
                else {
                    const user: IUser | null = await User.findOne({ phoneNumber: phoneNumber })
                    if (user) {
                        await sessionEntity.createSession(user._id, DBENUMS.USER_TYPE[1]);
                        const token = jwt.sign({ id: user._id, isAdmin: false }, CONFIG.JWT_SECRET_KEY)
                        console.log(token);
                        const statusData = STATUS_MSG.SUCCESS.LOGIN;
                        return Promise.resolve({ token, statusData })
                    }
                    else {
                        return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(''))
                    }

                }
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.INVALID_OTP)
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update existing user data
     * @param id 
     * @param bodyData 
     * @returns Object of status response
     */
    static async updateUser(id: Schema.Types.ObjectId, bodyData: Object): Promise<Object> {
        try {
            await validate.updateUser.validateAsync(bodyData);
            const user: IUser | null = await User.findByIdAndUpdate(id, bodyData, { new: true });
            if (user)
                return Promise.resolve({ ...STATUS_MSG.SUCCESS.UPDATE_SUCCESS('User'), data: user })
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${id}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description get user details
     * @param userId 
     * @returns User
     */
    static async userDetails(userId: Schema.Types.ObjectId): Promise<Object> {
        try {
            const user: IUser | null = await User.findById(userId);
            if (user)
                return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('User profile'), data: user })
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description change the phone number of a user account
     * @param userId 
     * @param newPhoneNumber 
     * @returns User
     */
    static async changePhoneNumber(userId: Schema.Types.ObjectId, newPhoneNumber: String): Promise<Object> {
        try {
            if (!await UserEntity.isPhoneNumAlreadyExist(newPhoneNumber)) {
                const user: IUser | null = await User.findByIdAndUpdate(userId, { phoneNumber: newPhoneNumber, isPhoneVerified: false }, { new: true })
                if (user)
                    return Promise.resolve({ ...STATUS_MSG.SUCCESS.UPDATED, data: user })
                return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.ALREADY_EXIST(newPhoneNumber))
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description user booking data
     * @param userId 
     * @returns Booking[]
     */
    static async myBookings(userId: Schema.Types.ObjectId): Promise<Object> {
        try {
            const bookings: IBooking[] = await Booking.find({ bookedBy: userId })
            return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('My booking'), data: bookings })
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description verify the user's email address
     * @param userId 
     * @param email 
     * @returns Object of status response
     */
    static async verifyEmail(email: string, token: any): Promise<Object> {
        try {
            const mailData = await sendEmail(email, token);
            return Promise.resolve({ ...STATUS_MSG.SUCCESS.MAIL_SENT, data: mailData })
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description verifying the user data of email verification
     * @param token 
     * @returns status response
     */
    static async verifyEmailWithToken(token: any): Promise<Object> {
        try {
            const verifyToken: any = jwt.verify(token, CONFIG.JWT_SECRET_KEY)
            if (verifyToken.id != undefined) {
                const user: IUser | null = await User.findByIdAndUpdate(verifyToken.id, { isMailVerified: true }, { new: true })
                if (user)
                    return Promise.resolve({ ...STATUS_MSG.SUCCESS.VERIFIED, data: user })
                return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserID: ${verifyToken.id}`))
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.INVALID_TOKEN)
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}