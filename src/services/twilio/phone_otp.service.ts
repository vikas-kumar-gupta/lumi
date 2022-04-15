import { CONFIG } from '../../constants'
import { STATUS_MSG } from '../../constants'
import { SERVICES } from '../../constants'
import { Twilio } from 'twilio'
import jwt from 'jsonwebtoken'
import express, { Request, Response, NextFunction } from 'express'

import User from '../../models/user.model'
import UserDetails from '../../models/userDetails.model'


const client = new Twilio(SERVICES.TWILIO.ACCOUNT_SID, SERVICES.TWILIO.AUTH_TOKEN)


export default class TwilioPhoneOTP {

    /**
     * @param phoneNumber 
     * @description to get the otp on mobile number
     */
    static async getOTP(phoneNumber: string): Promise<void> {
        try {
            await client.verify
                .services(SERVICES.TWILIO.SERVICE_ID)
                .verifications.create({ to: phoneNumber, channel: "sms" })
                .then((data: any) => {
                    console.log(data);
                    return Promise.resolve(STATUS_MSG.SUCCESS.OTPSENT)
                })
                .catch((err: any) => {
                    return Promise.reject(err)
                })
        }
        catch (err: any) {
            return Promise.reject(err)
        }
    }

    /**
     * @description to verify the given phone number
     * @param phoneNumber 
     * @param otp 
     * @returns Object
     */
    static async verifyOtp(phoneNumber: string, otp: string): Promise<Object> {
        try {
            const data: Object = await client.verify
                .services(SERVICES.TWILIO.SERVICE_ID)
                .verificationChecks.create({ to: phoneNumber, code: otp });
            return Promise.resolve(data)
        }
        catch (err: any) {
            return Promise.reject(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while verifying otp'))
        }
    }
}