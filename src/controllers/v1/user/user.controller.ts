import { CONFIG, STATUS_MSG, SERVICES } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { Twilio } from 'twilio'

import * as validate from '../../../utils/user.validator'
import User from '../../../models/user.model'
import Booking from '../../../models/booking.model'
import UserDetails from '../../../models/userDetails.model'
import { IUser } from '../../../interfaces/model.interface';
import UserEntity from '../../../entity/v1/user/user.entity';
import TwilioPhone from '../../../services/twilio/phone_otp.service'
import TwilioPhoneOTP from '../../../services/twilio/phone_otp.service';

const client = new Twilio(SERVICES.TWILIO.ACCOUNT_SID, SERVICES.TWILIO.AUTH_TOKEN)

export const getOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.body;
        //  validating the body
        await validate.getOtp.validateAsync(req.body);
        const data = await TwilioPhoneOTP.getOTP(phoneNumber);
        res.status(STATUS_MSG.SUCCESS.OTPSENT.statusCode).json(data)
    }
    catch (err: any) {
        res.status(400).json(err)
    }
}

export const verifyOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { otp, phoneNumber, loginType } = req.body;
        //  validating the body
        await validate.verifyOtp.validateAsync(req.body);
        let otpData: any = await TwilioPhoneOTP.verifyOtp(phoneNumber, otp)
        console.log(otpData);
        const data: any = await UserEntity.newUser(otpData, phoneNumber, loginType)
        res.cookie('jwt', data.token)
        res.status(data.statusData.statusCode).json(data.statusData)
    }
    catch (err) {
        // next(err);
        res.status(400).json(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validate.updateUser.validateAsync(req.body);
        const user = await User.findByIdAndUpdate(req.body.tokenId, req.body)
        if(user) {
            res.status(200).json(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('User'))
        }
        else {
            throw new Error()
        }
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const userDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.body.tokenId);
        if (user) {
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(user)
        }
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /**
         * ! password hashing is pending
         */
        const { currentPassword, newPassword } = req.body;
        await validate.changePassword.validateAsync(req.body);
        const user = await User.findById(req.body.tokenId);
        if (user && user.password == currentPassword) {
            await User.findByIdAndUpdate(req.body.tokenId, { password: newPassword }, null, (err: any, data: any) => {
                if (err) {
                    throw new Error(err)
                }
                res.status(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('').statusCode).json(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('Password'))
            });
        }
        else {
            res.status(STATUS_MSG.ERROR.INVALID_CREDENTIALS.statusCode).json(STATUS_MSG.ERROR.INVALID_CREDENTIALS)
        }

    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while changing the password'))
    }
}

export const changePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newPhoneNumber } = req.body;
        await validate.changePhoneNumber.validateAsync(req.body);

        //  check wheather the given phone number already registered
        const isPhoneAlreadyRegistered = await User.findOne({ phoneNumber: newPhoneNumber })
        if (!isPhoneAlreadyRegistered) {
            const user = await User.findByIdAndUpdate(req.body.tokenId, { phoneNumber: newPhoneNumber, isPhoneVerified: false }, null, (err: any, data: any) => {
                if (err) {
                    throw new Error()
                }
                res.status(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('').statusCode).json(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('Phone number updated'))
            })
        }
        else {
            res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Given phone number is already registered'))
        }
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const myBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await Booking.find({ bookedBy: req.body.tokenId })
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(bookings)
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // here user email will be verified
    }
    catch (err) {

    }
}