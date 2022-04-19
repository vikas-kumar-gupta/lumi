import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from 'mongoose';

import { IUserInvite } from '../interfaces/model.interface';

const userInviteSchema = new Schema<IUserInvite>(
    {
        invitedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        invitedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        inviteStatus: {
            type: String,
            enum: DBENUMS.INVITE_STATUS,
            default: DBENUMS.INVITE_STATUS[0],
            required: true
        },
        inviteType: {
            type: String,
            enum: DBENUMS.INVITE_TYPE,
            required: true
        }        
    },
    {
        timestamps: true
    }
)

const UserInvite = model<IUserInvite>('User_invite', userInviteSchema);

export default UserInvite;
