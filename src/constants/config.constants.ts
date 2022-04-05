import dotenv from 'dotenv'

dotenv.config({path: '../../.env'})

export const CONFIG = {
    PORT : process.env.PORT,
    DB_URL: process.env.MONGODB_URL,
}