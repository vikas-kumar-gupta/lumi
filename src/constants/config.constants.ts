import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

export const CONFIG = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
    JWT_SECRET_KEY: <string>process.env.JWT_SECRET_KEY
}

export const SERVICES = {
    TWILIO: {
        ACCOUNT_SID: <string>process.env.TWILIO_ACCOUNT_SID,
        AUTH_TOKEN: <string>process.env.TWILIO_AUTH_TOKEN,
        SERVICE_ID: <string>process.env.TWILIO_SERVICE_ID
    }
}