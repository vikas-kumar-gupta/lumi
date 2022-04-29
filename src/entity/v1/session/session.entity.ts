import { STATUS_MSG } from '../../../constants';
import { HydratedDocument } from 'mongoose';
import { ISession, ISessionDeviceData } from './../../../interfaces/model.interface';
import Session from '../../../models/user/session.model';
import { redis } from '../../../db/redis.config'

export default class sessionEntity {
    static async createSession(userId: any, userType: String): Promise<void> {
        try {
            const session: HydratedDocument<ISession> = new Session({ userId, userType: userType });
            await session.save();
            const query = {
                userType: session.userType,
                isActive: session.isActive, 
                deviceId: session.deviceId
            }
            redis.createSession(userId.toString(), ({ sessionId: session._id?.toString(),  ...query}));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async chekSession(sessionId: any): Promise<void> {
        try {
            const session = await redis.findSession(sessionId)
            if (!session) return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('Session'))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}