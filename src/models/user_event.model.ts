import mongoose, { Schema, model } from "mongoose";
import { IUserEvent } from '../interfaces/model.interface'

const userEventSchema = new Schema<IUserEvent>(
    {
        eventId: {
            type: mongoose.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
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