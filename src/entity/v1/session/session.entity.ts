import { STATUS_MSG } from '../../../constants';
import { HydratedDocument } from 'mongoose';
import { ISession, ISessionDeviceData } from './../../../interfaces/model.interface';
import Session from '../../../models/session.model';
import { redis } from '../../../db/redis.config'

export default class sessionEntity {
    static async createSession(userId: any): Promise<void> {
        try {

            const session: HydratedDocument<ISession> = new Session({ userId });
            await session.save();
            redis.createSession(userId.toString(), ({sessionId: session._id?.toString(), deviceId: session.deviceId}));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async chekSession(sessionId: any): Promise<void> {
        try{
            const session = await redis.findSession(sessionId)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}