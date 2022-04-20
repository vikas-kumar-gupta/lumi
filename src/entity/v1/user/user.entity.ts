import { IBooking, IUser, IUserDetails } from './../../../interfaces/model.interface';
import { CONFIG } from "../../../constants"
import { STATUS_MSG } from "../../../constants";
import User from '../../../models/user.model';
import UserDetails from "../../../models/userDetails.model";
import Booking from '../../../models/booking.model'

import { Schema, HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import { sendEmail } from '../../../services/nodemailer/email.service';

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
                    const token = jwt.sign({ id: userDetails._id }, CONFIG.JWT_SECRET_KEY);
                    console.log(token);
                    const statusData = STATUS_MSG.SUCCESS.CREATED;
                    return Promise.resolve({ token, statusData });

                }
                else {
                    const user: IUser | null = await User.findOne({ phoneNumber: phoneNumber })
                    if (user) {
                        const token = jwt.sign({ id: user._id }, CONFIG.JWT_SECRET_KEY)
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
     * @param data 
     * @returns Object of status response
     */
    static async updateUser(id: Schema.Types.ObjectId, data: Object): Promise<Object> {
        try {
            const user: IUser | null = await User.findByIdAndUpdate(id, data);
            if (user) {
                return Promise.resolve(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('User updated'))
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST)
            }
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST)
        }
    }

    /**
     * @description get user details
     * @param userId 
     * @returns User
     */
    static async userDetails(userId: Schema.Types.ObjectId): Promise<IUser> {
        try {
            const user: IUser | null = await User.findById(userId);
            if (user) {
                return Promise.resolve(user)
            }
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
        }
    }

    /**
     * @description change the phone number of a user account
     * @param userId 
     * @param newPhoneNumber 
     * @returns Object of status response
     */
    static async changePhoneNumber(userId: Schema.Types.ObjectId, newPhoneNumber: String): Promise<Object> {
        try {
            if (!await UserEntity.isPhoneNumAlreadyExist(newPhoneNumber)) {
                const user: IUser | null = await User.findByIdAndUpdate(userId, { phoneNumber: newPhoneNumber, isPhoneVerified: false })
                if (user)
                    return Promise.resolve(STATUS_MSG.SUCCESS.UPDATED)
                return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.ALREADY_EXIST(newPhoneNumber))
            }
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST)
        }
    }

    /**
     * @description user booking data
     * @param userId 
     * @returns Booking[]
     */
    static async myBookings(userId: Schema.Types.ObjectId): Promise<IBooking[] | Object> {
        try {
            const bookings: IBooking[] = await Booking.find({ bookedBy: userId })
            return Promise.resolve(bookings)
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR)
        }
    }

    /**
     * ! to be implemented cause of email and password
     */

    /**
     * @description verify the user's email address
     * @param userId 
     * @param email 
     * @returns Object of status response
     */
    static async verifyEmail(email: String): Promise<void> {
        try {
            const mailData = await sendEmail(email);
            return Promise.resolve(mailData)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}