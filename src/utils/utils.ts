import { CONFIG } from '../constants'
import Joi from "joi"
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

export const getJWTToken = async (body: any, expIn?: number) => {
    const option: any = {};
    if (expIn) {
        option['expiresIn'] = expIn;
    }
    const token = jwt.sign(body, CONFIG.JWT_SECRET_KEY, option);
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