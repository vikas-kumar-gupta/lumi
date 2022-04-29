import { DBENUMS } from "../../constants";
import { Schema, model } from "mongoose";
import { ISession } from '../../interfaces/model.interface'

const sessionSchema = new Schema<ISession>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        userType: {
            type: String,
            enum: DBENUMS.USER_TYPE,
            required: true
        },
        deviceToken: {
            type: String,
            required: false
        },
        deviceId: {
            type: String,
            required: false
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