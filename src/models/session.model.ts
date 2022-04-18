import mongoose, { Schema, model } from "mongoose";
import { ISession } from '../interfaces/model.interface'

const sessionSchema = new Schema<ISession>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        deviceId: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Session = model<ISession>('Session', sessionSchema);

export default Session;