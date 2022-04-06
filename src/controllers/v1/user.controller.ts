import { CONFIG } from '../../constants'
import express, { Request, Response, NextFunction } from 'express';

const client = require('twilio')(CONFIG.TWILIO_ACC_SID, CONFIG.TWILIO_AUTH_TOKEN)

export const sendOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const { phoneNumber } = req.body;
    client.verify
        .services(CONFIG.TWILIO_SERVICE_ID)
        .verifications.create({ to: phoneNumber, channel: "sms" })
        .then((data: any) => res.status(200).json(data));
}

export const verifyOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const { otp } = req.body;
    client.verify
        .services(CONFIG.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: "+919264928257", code: otp })
        .then((data: any) => res.status(200).json(data));
}