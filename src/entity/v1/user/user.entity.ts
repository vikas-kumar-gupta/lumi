import { IBooking, IUser, IUserDetails } from './../../../interfaces/model.interface';
import { CONFIG } from "../../../constants"
import { STATUS_MSG } from "../../../constants";
import User from '../../../models/user.model';
import UserDetails from "../../../models/userDetails.model";
import Booking from '../../../models/booking.model'

import mongoose, { Schema, model, HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'

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
    static async newUser(otpData: any, phoneNumber: String): Promise<void | Object> {
        try {
            if (!await UserEntity.isPhoneNumAlreadyExist(phoneNumber)) {
                console.log('new user');
                const user = new User({ phoneNumber: phoneNumber, isPhoneVerified: true });
                user.save(err => {
                    if (!err) {
                        console.log('user created');
                        const userDetails = new UserDetails({ _id: user._id });
                        userDetails.save(err => {
                            if (!err) {
                                console.log('User Details created');

                                const token = jwt.sign({ _id: userDetails._id }, CONFIG.JWT_SECRET_KEY);
                                console.log(token);
                                return Promise.resolve(STATUS_MSG.SUCCESS.CREATED);
                            }
                            else {
                                throw new Error(err.message)
                            }
                        })
                    }
                    else {
                        throw new Error(err.message)
                    }
                })
            }
            else {
                const user: IUser | null = await User.findOne({ phoneNumber: phoneNumber }, null, (err: any, data: any) => {
                    if (err) throw new Error(err)
                })
                if (user) {
                    const token = jwt.sign({ id: user._id }, CONFIG.JWT_SECRET_KEY)
                    console.log(token);
                }
                return Promise.resolve(STATUS_MSG.SUCCESS.LOGIN)
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
    static async updateUser(id: Schema.Types.ObjectId, data: Object): Promise<void> {
        try {
            const user = await User.findByIdAndUpdate(id, data, null, (err: any, data: any) => {
                if (err) {
                    throw new Error(err)
                }
                return Promise.resolve(STATUS_MSG.SUCCESS.UPDATED)
            })
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
            if(user) {
                return Promise.resolve(user)
            }
            throw new Error(STATUS_MSG.ERROR.NOT_EXIST('').message)
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
        }
    }

    /**
     * @description change the password of a user account
     * @param userId 
     * @param currentPassword 
     * @param newPassword 
     * @returns Object of status response
     */
    static async changePassword(userId: Schema.Types.ObjectId , currentPassword: string, newPassword: string): Promise<void> {
        try {
            const user = await User.findById(userId);
            if(user && user.password == currentPassword) {
                await User.findByIdAndUpdate(userId, {password: newPassword}, null, (err: any, data: any) => {
                    if(err) {
                        throw new Error(err)
                    }
                    return Promise.resolve(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('Password updated'));
                })
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description change the phone number of a user account
     * @param userId 
     * @param newPhoneNumber 
     * @returns Object of status response
     */
    static async changePhoneNumber(userId: Schema.Types.ObjectId, newPhoneNumber: String): Promise<Object | void> {
        try {
            if(!await UserEntity.isPhoneNumAlreadyExist(newPhoneNumber)){
                const user = await User.findByIdAndUpdate(userId, {phoneNumber: newPhoneNumber, isPhoneVerified: false}, null, (err: any, data: any) => {
                    if(err) {
                        throw new Error(err)
                    }
                    return Promise.resolve(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('Phone number updated'));
                })
            }
            else {
                throw new Error('Phone number is already registered')
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
    static async myBookings(userId: Schema.Types.ObjectId): Promise<IBooking[] | Object> {
        try {
            const bookings: IBooking[] = await Booking.find({bookedBy: userId})
            return Promise.resolve(bookings)
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.DB_ERROR)
        }
    }

    /**
     * ! to be implemented
     */

    /**
     * @description verify the user's email address
     * @param userId 
     * @param email 
     * @returns Object of status response
     */
    static async verifyEmail(userId: Schema.Types.ObjectId ,email: String): Promise<void> {
        try {

        }
        catch (err) {

        }
    }
}