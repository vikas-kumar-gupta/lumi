import dotenv from 'dotenv'

dotenv.config({path: '../.env'})

export const CONFIG = {
    PORT : process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    TWILIO_ACC_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_ID: process.env.TWILIO_SERVICE_ID
}