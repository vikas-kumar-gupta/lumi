import { CONFIG, STATUS_MSG } from '../constants'
import Joi from "joi"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

export const getJWTToken = async (payload: {}, expIn?: number) => {
    const option: any = {};
    if (expIn) {
        option['expiresIn'] = expIn;
    }
    const token = jwt.sign(payload, CONFIG.JWT_SECRET_KEY, option);
    console.log(token);
    
    return token
}

export const verifyJWTToken = async (token: string, secret?: string) => {
    const secretKey = secret ? secret : CONFIG.JWT_SECRET_KEY;
    return jwt.verify(token, secretKey);
}

export const decodeToken = async (token: string, secret?: string) => {
    let payload, type;
    try {
        const secretKey = secret ? secret : CONFIG.JWT_SECRET_KEY;
        payload = jwt.verify(token, secretKey);
        if(payload) {
            return {success: true, data: payload}
        }
        else {
            return {success: false, message: "invalid"}
        }
    }
    catch (err: any) {
        type = err.name == "TokenExpiredError" ? "expired" : "invalid";
        return {success: false, message: type}
    }
}

export const sendErrorResponse = (error: any) => {
    switch(error.name) {
        case "MongoError" : {
            if(error.code == 11000) {
                return {
                    statusCode: 400,
                    success: error.success ? error.success : false,
                    message: "This" + error.errmsg.split(':')[2].split('_')[0] + " is already registered.",
                    type: "MongoError"
                }
            }
            else {
                return {
                    statusCode: 500,
                    success: false,
                    message: STATUS_MSG.ERROR.IMP_ERROR.message,
                }
            }
        }
        case "ValidationError": {
            return {
                statusCode: 400,
                success: false,
                message: error.message,
                type: "ValidationError"
            }
        }
        case "MongooseError": {
            return {
                statusCode: 400,
                success: false,
                message: error.message,
                type: "MongooseError"
            }
        }
        default: {
            switch (error.type) {
                case "DB_ERROR":
                case "IMP_ERROR": {
                    return {
                        statusCode: error.statusCode ? error.statusCode : 500,
                        success: false,
                        message: error.message,
                        type: "DB_ERROR"
                    }
                }
                default: {
                    return {
                        statusCode: error.statusCode ? error.statusCode : 400,
                        success: error.success,
                        message: error.message,
                        type: error.type
                    }
                }
            }
        }
    }
}