import mongoose, { Schema, model } from "mongoose";
import { ISession } from '../interfaces/model.interface'

const sessionSchema = new Schema<ISession>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        isLoggedIn: {
            type: Boolean,
            default: true,
            required: true
        },
        deviceToken: {
            type: String,
            required: true
        },

        deviceId: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Session = model<ISession>('Session', sessionSchema);

export default Session;