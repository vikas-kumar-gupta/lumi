import express, { Request, Response, NextFunction } from 'express';
import * as validate from '../../../utils/user.validator'
import UserEntity from '../../../entity/v1/user/user.entity';
import TwilioPhoneOTP from '../../../services/twilio/phone_otp.service';
import { sendErrorResponse } from '../../../utils/utils';
import jwt from 'jsonwebtoken';

import { sendEmail } from '../../../services/nodemailer/email.service';
import { CONFIG, DBENUMS, STATUS_MSG } from '../../../constants';
import { IBooking, IUser } from '../../../interfaces/model.interface';
import sessionEntity from '../../../entity/v1/session/session.entity';
import User from '../../../models/user.model';

export const getOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.body;
        await validate.getOtp.validateAsync(req.body);
        const data: any = await TwilioPhoneOTP.getOTP(phoneNumber);
        res.status(data.statusCode).json(data)
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const verifyOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { otp, phoneNumber, loginType } = req.body;
        await validate.verifyOtp.validateAsync(req.body);

        // verifyng the given otp
        let otpData: any = await TwilioPhoneOTP.verifyOtp(phoneNumber, otp)
        if (otpData.status == 'approved' && otpData.status != undefined) {

            // checking if user already registered
            if (! await UserEntity.isPhoneNumAlreadyExist(phoneNumber)) {
                //  creating new user
                const user: IUser | null = await UserEntity.createNewUser({ phoneNumber: phoneNumber, isPhoneVerified: true, loginType: loginType })
                await sessionEntity.createSession(user._id, DBENUMS.USER_TYPE[1]);
                const token = jwt.sign({ id: user._id, isAdmin: false, location: user.location }, CONFIG.JWT_SECRET_KEY);
                console.log(token);
                res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).json({ token, ...STATUS_MSG.SUCCESS.CREATED })
            }
            else {
                //  logging in the user
                const user: IUser | null = await UserEntity.findOneUser({ phoneNumber });
                await sessionEntity.createSession(user._id, DBENUMS.USER_TYPE[1])
                const token = jwt.sign({ id: user._id, isAdmin: false, location: user.location }, CONFIG.JWT_SECRET_KEY)
                console.log(token);
                res.status(STATUS_MSG.SUCCESS.LOGIN.statusCode).json({ token, ...STATUS_MSG.SUCCESS.LOGIN })
            }
        }
        // if status is not approved
        res.status(STATUS_MSG.ERROR.INVALID_OTP.statusCode).json(STATUS_MSG.ERROR.INVALID_OTP)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validate.updateUser.validateAsync(req.body);
        const user: IUser = await UserEntity.updateUserById(req.body.tokenId, req.body)
        const token = jwt.sign({ id: user._id, isAdmin: false, location: user.location }, CONFIG.JWT_SECRET_KEY);
        res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json({ ...STATUS_MSG.SUCCESS.UPDATED, data: user });
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const userDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: IUser = await UserEntity.userDetails(req.body.tokenId);
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('User profile'), data: user });
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const changePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validate.changePhoneNumber.validateAsync(req.body);
        const { newPhoneNumber } = req.body;

        //  checking if phone number already registered with other account
        if (!await UserEntity.isPhoneNumAlreadyExist(newPhoneNumber)) {
            //  changing the phone number of the user
            const user: IUser = await UserEntity.updateUserById(req.body.tokenId, { phoneNumber: newPhoneNumber, isPhoneVerified: false });
            res.status(STATUS_MSG.SUCCESS.UPDATED.statusCode).json({ ...STATUS_MSG.SUCCESS.UPDATED, data: user })
        }
        res.status(STATUS_MSG.ERROR.ALREADY_EXIST('').statusCode).json(STATUS_MSG.ERROR.ALREADY_EXIST(newPhoneNumber))
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const myBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings: IBooking[] = await UserEntity.myBookings(req.body.tokenId);
        res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(bookings)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = req.body.email;
        const token: any = req.headers['authorization']
        
        //  chheking if there exist the given mail
        const user: IUser | null = await User.findOne({ email })
        if (user) {

            // if mail is already verified 
            if (user.isMailVerified) {
                res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('This email is alrady registered and verified'))
            }
            else {
                const mailData = await sendEmail(email, token);
                res.status(STATUS_MSG.SUCCESS.MAIL_SENT.statusCode).json({ ...STATUS_MSG.SUCCESS.MAIL_SENT, data: mailData })
            }
        }
        else {
            const mailData = await sendEmail(email, token);
            res.status(STATUS_MSG.SUCCESS.MAIL_SENT.statusCode).json({ ...STATUS_MSG.SUCCESS.MAIL_SENT, data: mailData })
        }
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData);
    }
}

export const verifyEmailWithToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // sending the token with url params
        const token = req.params.token;
        const verifyToken: any = jwt.verify(token, CONFIG.JWT_SECRET_KEY)
        if (verifyToken.id != undefined) {

            //  changing the status from not verified to verified
            const user: IUser = await UserEntity.updateUserById(verifyToken.id, { isMailVerified: true })
            res.status(STATUS_MSG.SUCCESS.VERIFIED.statusCode).json({ ...STATUS_MSG.SUCCESS.VERIFIED })
        }
        else {
            return Promise.reject(STATUS_MSG.ERROR.INVALID_TOKEN)
        }
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData);
    }
}

// ! to be implement
export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {

    }
}