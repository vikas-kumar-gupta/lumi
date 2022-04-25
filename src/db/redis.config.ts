import { createClient } from "redis";
import {STATUS_MSG} from '../constants'
const client = createClient();

class redisDAO {
    readonly Session = "session";
    async connect(): Promise<void> {
        try {
            await client.connect();
            console.log("Redis connectd");
        } catch (err: any) {
            console.log(err.message);
            process.exit(1);
        }
    }

    async createSession(user_id: any, payLoad: any) {
        client.HSET(this.Session, user_id, JSON.stringify(payLoad));
    }

    async findSession(user_id: any) {
        try {
            const user = await client.HGET(this.Session, user_id);
            if (!user) {
                return Promise.reject(STATUS_MSG.ERROR.SESSION_EXPIRED);
            } else {
                return true;
            }
        } catch (err: any) {
            return Promise.reject(err);
        }
    }
}
export const redis = new redisDAO();