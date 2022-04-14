import { IUser, IUserDetails } from './../../../interfaces/model.interface';
import { CONFIG } from "../../../constants"
import { STATUS_MSG } from "../../../constants";
import User from '../../../models/user.model';
import UserDetails from "../../../models/userDetails.model";

import mongoose, { Schema, model, HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'

export default class UserEntity {

    static async generateTokenFor(id: Schema.Types.ObjectId): Promise<String> {
        try {
            const token = jwt.sign({ id: id }, CONFIG.JWT_SECRET_KEY)
            return Promise.resolve(token)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async isPhoneNumAlreadyExist(phoneNumber: string): Promise<Boolean> {
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

    static async newUser(otpData: any, phoneNumber: string): Promise<void | Object> {
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
}