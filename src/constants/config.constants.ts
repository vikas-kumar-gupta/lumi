import dotenv from 'dotenv/config'
dotenv;

export const CONFIG = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_URL: <string>process.env.MONGODB_URL,
    JWT_SECRET_KEY: <string>process.env.JWT_SECRET_KEY
}

export const SERVICES = {
    TWILIO: {
        ACCOUNT_SID: <string>process.env.TWILIO_ACCOUNT_SID,
        AUTH_TOKEN: <string>process.env.TWILIO_AUTH_TOKEN,
        SERVICE_ID: <string>process.env.TWILIO_SERVICE_ID
    },
    EMAIL: {
        MAIL: <string>process.env.MAIL,
        MAIL_PASSWORD: <string>process.env.MAIL_PASSWORD
    }
}