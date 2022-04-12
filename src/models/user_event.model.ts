import mongoose, { Schema, model } from "mongoose";
import { IUserEvent } from '../interfaces/model.interface'

const userEventSchema = new Schema<IUserEvent>(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        eventId: {
            type: mongoose.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        userInvite: {
            type: mongoose.Types.ObjectId,
            ref: 'User_Invite',
            required: false
        },
        paymentId: {
            type: mongoose.Types.ObjectId,
            ref: 'Payment',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const UserEvent = model<IUserEvent>('User_Event', userEventSchema);

export default UserEvent;