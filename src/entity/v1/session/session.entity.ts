import { STATUS_MSG } from '../../../constants';
import mongoose from 'mongoose';
import {ISession, ISessionDeviceData} from './../../../interfaces/model.interface';
import Session from '../../../models/session.model';

export default class sessionEntity {
    static async createSession(userId: mongoose.Types.ObjectId, deviceData: ISessionDeviceData): Promise<void>{
        try {
            const session = new Session({userId, ...deviceData});
            await session.save();
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}