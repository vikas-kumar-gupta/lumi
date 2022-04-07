import { CONFIG, STATUS_MSG, DATE } from '../../constants'
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import User from '../../models/user.model'
import UserDetails from '../../models/userDetails.model'

const client = require('twilio')(CONFIG.TWILIO_ACC_SID, CONFIG.TWILIO_AUTH_TOKEN)

export const getOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.body;
        client.verify
            .services(CONFIG.TWILIO_SERVICE_ID)
            .verifications.create({ to: phoneNumber, channel: "sms" })
            .then((data: any) => res.status(200).json(data));
    }
    catch (err: any) {
        next(err);
    }
}

export const verifyOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { otp, phoneNumber } = req.body;
        let otpData: any;

        //  verifying the given otp
        await client.verify
            .services(CONFIG.TWILIO_SERVICE_ID)
            .verificationChecks.create({ to: phoneNumber, code: otp })
            .then((data: any) => {
                otpData = data;
                res.status(200).json(data)
            });

        //  if OTP verified then creating new User account
        if (otpData != undefined && otpData.status === 'approved') {
            const phoneNumber = otpData.to.slice(3, 13);
            const user = new User({ phoneNumber: phoneNumber, isPhoneVerified: true, createdAt: DATE.TIMESTAMP.CREATED_AT() })
            user.save(err => {
                if (!err) {
                    // creating new userDetails schema for the same user with same _id
                    const userDetails = new UserDetails({ _id: user._id, createdAt: DATE.TIMESTAMP.CREATED_AT() })
                    userDetails.save(err => {
                        if (err) throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message)
                    });
                }
                else {
                    const token = jwt.sign({_id: user._id}, CONFIG.JWT_SECRET_KEY);
                    res.cookie('jwt', token, { expires: new Date(Date.now() + 600000) });
                    throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message)
                }
            })
        } else {
            throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message)
        }
    }
    catch (err) {
        next(err);
    }
}