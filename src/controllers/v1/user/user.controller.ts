import express, { Request, Response, NextFunction } from 'express';
import * as validate from '../../../utils/user.validator'
import UserEntity from '../../../entity/v1/user/user.entity';
import TwilioPhoneOTP from '../../../services/twilio/phone_otp.service';
import { sendErrorResponse } from '../../../utils/utils';

import { sendEmail } from '../../../services/nodemailer/email.service';

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
        let otpData: any = await TwilioPhoneOTP.verifyOtp(phoneNumber, otp)
        console.log(otpData);
        const data: any = await UserEntity.newUser(otpData, phoneNumber, loginType)
        const token = data.token;
        const statusData = data.statusData
        res.status(statusData.statusCode).setHeader('Token', `${token}`).json({ token, statusData })
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await UserEntity.updateUser(req.body.tokenId, req.body)
        res.status(data.statusCode).json(data);
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const userDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await UserEntity.userDetails(req.body.tokenId);
        res.status(data.statusCode).json(data);
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const changePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newPhoneNumber } = req.body;
        await validate.changePhoneNumber.validateAsync(req.body);
        const data: any = await UserEntity.changePhoneNumber(req.body.tokenId, newPhoneNumber)
        res.status(data.statusCode).json(data)
    }
    catch (err: any) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const myBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = await UserEntity.myBookings(req.body.tokenId);
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

// ! to be implement because of not having fake email and password
export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email: string = req.body.email;
        const token: any = req.headers['authorization']
        const data: any = await UserEntity.verifyEmail(email, token)
        res.status(data.statusCode).json(data)
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData);
    }
}

export const verifyEmailWithToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.params.token;
        const data: any = await UserEntity.verifyEmailWithToken(token)
        res.status(data.statusCode).json(data)
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