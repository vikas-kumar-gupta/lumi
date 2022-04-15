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
        const data: any = await UserEntity.updateUser(req.body.tokenId, req.body)
        res.status(data.statusCode).json(data);
    }
    catch (err: any) {
        next(err)
    }
}

export const userDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await UserEntity.userDetails(req.body.tokenId);
        res.status(200).json(data)
    }
    catch (err:any) {
        next(err)
        // res.status(err.statusCode).json(err)
    }
}

export const changePhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { newPhoneNumber } = req.body;
        await validate.changePhoneNumber.validateAsync(req.body);
        const data: any = await UserEntity.changePhoneNumber( req.body.tokenId, newPhoneNumber)
        res.status(data.statusCode).json(data)
    }
    catch (err: any) {
        // res.status(err.statusCode).json(err)
        next(err)
    }
}

export const myBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data =  await UserEntity.myBookings(req.body.tokenId);
        res.status(200).json(data)
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