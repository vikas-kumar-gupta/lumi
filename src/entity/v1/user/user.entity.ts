import { IBooking, IUser, IUserDetails } from './../../../interfaces/model.interface';
import { CONFIG, STATUS_MSG, EXCLUDE_DATA } from "../../../constants"
import User from '../../../models/user.model';
import UserDetails from "../../../models/user_details.model";
import Booking from '../../../models/booking.model'
import { Schema, HydratedDocument } from 'mongoose'
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
            if (user)
                return Promise.resolve(true)
            return Promise.resolve(false)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description to create a new user account
     * @param options 
     * @returns User
     */
    static async createNewUser(options: Object): Promise<IUser | Object> {
        try {
            const user: HydratedDocument<IUser> = new User(options);
            await user.save();
            const userDetails: HydratedDocument<IUserDetails> = new UserDetails({ _id: user._id });
            await userDetails.save()
            return Promise.resolve(user)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description to find any user based on the given otion
     * @param options 
     * @returns User
     */
    static async findOneUser(options: Object): Promise<Object> {
        try {
            const user: IUser | null = await User.findOne(options);
            if (user)
                return Promise.resolve(user)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User '));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update existing user data
     * @param id 
     * @param options 
     * @returns Object of status response
     */
    static async updateUserById(id: any, options: Object): Promise<IUser | Object> {
        try {
            const user: IUser | null = await User.findByIdAndUpdate(id, options, { new: true }).select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE });
            if (user)
                return Promise.resolve(user)
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
    static async userDetails(userId: any): Promise<IUser> {
        try {
            const user: IUser | null = await User.findById(userId, { ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE });
            if (user)
                return Promise.resolve(user)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
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
    static async myBookings(userId: Schema.Types.ObjectId): Promise<IBooking[]> {
        try {
            const bookings: IBooking[] = await Booking.find({ bookedBy: userId })
            return Promise.resolve(bookings)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}