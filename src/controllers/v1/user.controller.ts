import { CONFIG, STATUS_MSG, DATE } from '../../constants'
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import * as validate from '../../utils/validator'
import User from '../../models/user.model'
import UserDetails from '../../models/userDetails.model'
import { IUser } from '../../interfaces/model.interface';
import * as utils from '../../utils/utils'

const client = require('twilio')(CONFIG.TWILIO_ACC_SID, CONFIG.TWILIO_AUTH_TOKEN)

export const getOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { phoneNumber } = req.body;
        //  validating the body
        await validate.getOtp.validateAsync(req.body);
        client.verify
            .services(CONFIG.TWILIO_SERVICE_ID)
            .verifications.create({ to: phoneNumber, channel: "sms" })
            .then((data: any) => res.status(200).json(data))
            .catch((err: any) => res.status(500).json(err));
    }
    catch (err: any) {
        next(err);
    }
}

export const verifyOtp = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const { otp, phoneNumber } = req.body;
        //  validating the body
        await validate.verifyOtp.validateAsync(req.body);
        let otpData: any;

        //  verifying the given otp
        await client.verify
            .services(CONFIG.TWILIO_SERVICE_ID)
            .verificationChecks.create({ to: phoneNumber, code: otp })
            .then((data: any) => {
                otpData = data;
                console.log(data);
            })
            .catch((err: any) => console.log(`--------------\n${err}`));

        //  if OTP verified then creating new User account
        if (otpData != undefined && otpData.status === 'approved') {
            const isAlreadyExist = await User.findOne({ phoneNumber: phoneNumber });

            // check if phoneNumber already exist
            if (isAlreadyExist == null) {
                const user = new User({ phoneNumber: phoneNumber, isPhoneVerified: true})
                user.save(err => {
                    if (!err) {
                        // creating new userDetails schema for the same user with same _id
                        const userDetails = new UserDetails({ _id: user._id });
                        userDetails.save(err => {
                            if (!err) {
                                const token = jwt.sign({ _id: userDetails._id }, CONFIG.JWT_SECRET_KEY);
                                // const token = utils.getJWTToken({ _id: userDetails._id }, 21600000);
                                /**
                                 * milisecond converting values
                                 * 6 hrs --> 21600000
                                 * 1 hrs --> 3600000
                                 * 1 day --> 86400000
                                 * 10 day --> 864000000
                                 */
                                res.cookie('jwt', token, { expires: new Date(Date.now() + 21600000) }); // 6 hrs     
                                res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).json(STATUS_MSG.SUCCESS.CREATED);
                            }
                            else {
                                throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message);
                            }
                        });
                    }
                    else {
                        console.log('error wile saving user data');
                        console.log(err.message);
                        console.log(err.name);
                        
                        throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message);
                    }
                })
            }
            else {
                // const token = jwt.sign({ _id: isAlreadyExist._id }, CONFIG.JWT_SECRET_KEY)
                const token = utils.getJWTToken({_id: isAlreadyExist._id}, 21600000)
                res.cookie('jwt', token, { expires: new Date(Date.now() + 21600000) });     // 6 hrs
                console.log('logged in -------------------------');
                
                res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(STATUS_MSG.SUCCESS.DEFAULT)
            }
        } else {
            throw new Error(STATUS_MSG.ERROR.BAD_REQUEST.message)
        }
    }
    catch (err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validate.updateUser.validateAsync(req.body);
        const user = await User.findByIdAndUpdate(req.body.tokenId, req.body, null, (err: any, data: any) => {
            if (err) {
                console.log(err);
            }
            console.log(data);
        })
    }
    catch (err) {
        next(err)
    }
}