import { IPayment, IUser, IUserDetails, IUserEvent } from './../../../interfaces/model.interface';
import { CONFIG, STATUS_MSG, EXCLUDE_DATA } from "../../../constants"
import User from '../../../models/user/user.model';
import UserDetails from "../../../models/user/user_details.model";
import { Schema, HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import UserEvent from '../../../models/user/user_event.model';
import Payment from '../../../models/user/payment.model';


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
    static async createNewUser(options: Object): Promise<IUser> {
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
     * @param filter 
     * @returns User
     */
    static async findOneUser(filter: Object): Promise<IUser> {
        try {
            const user: IUser | null = await User.findOne(filter);
            if (user)
                return Promise.resolve(user)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User '));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description finding a user by _id
     * @param userId 
     * @returns IUser
     */
    static async findUserById(userId: any): Promise<IUser> {
        try {
            const user: IUser | null = await User.findById(userId);
            if (user)
                return Promise.resolve(user);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User '));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update existing user data
     * @param id 
     * @param update 
     * @returns Object of status response
     */
    static async updateUserById(id: any, update: Object): Promise<IUser> {
        try {
            const user: IUser | null = await User.findByIdAndUpdate(id, update, { new: true }).select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE });
            if (user)
                return Promise.resolve(user)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${id}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description updating a user by filter
     * @param filter 
     * @param update 
     * @returns 
     */
    static async updateOneUser(filter: object, update: Object): Promise<IUser> {
        try {
            const user: IUser | null = await User.findOneAndUpdate(filter, update, { new: true })
                .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE })
            if (user)
                return Promise.resolve(user)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User '))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description finding the userDeatils based on the given filters
     * @param filter 
     * @returns 
     */
    static async findOneUserDetails(filter: Object): Promise<IUserDetails> {
        try {
            const userDetails: IUserDetails | null = await UserDetails.findOne(filter);
            if (userDetails)
                return Promise.resolve(userDetails)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('User'))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description updating userDetails by _id
     * @param userId 
     * @param options 
     * @returns 
     */
    static async updateUserDetailsById(userId: any, options: Object): Promise<IUserDetails> {
        try {
            const userDetails: IUserDetails | null = await UserDetails.findByIdAndUpdate(userId, options, { new: true })
                .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE });
            if (userDetails)
                return Promise.resolve(userDetails);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${userId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description get user data
     * @param userId 
     * @returns User
     */
    static async userData(userId: any): Promise<IUser> {
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
     * @returns IBooking[]
     */
    static async myBookings(userId: any): Promise<IUserEvent[]> {
        try {
            const userEvents: IUserEvent[] = await UserEvent.find({ userId: userId })
                .sort({ $natural: -1 })
                .populate({
                    path: 'eventId userInvite paymentId',
                    select: 'eventName eventDate eventLocation price payTax grandTotal name'
                })
                .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE });
            return Promise.resolve(userEvents)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description creating new payment
     * @param options 
     * @returns IPayment
     */
    static async initPayment(options: Object): Promise<IPayment> {
        try {
            const payment: HydratedDocument<IPayment> = new Payment(options)
            await payment.save();
            return Promise.resolve(payment);
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}