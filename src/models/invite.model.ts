import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from "mongoose";

import { IInvite } from "../interfaces/model.interface"

const inviteSchema = new Schema<IInvite>(
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
        eventDetails: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        inviteStatus: {
            type: String,
            enum: DBENUMS.INVITE_STATUS,
            default: DBENUMS.INVITE_STATUS[0],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Invite = model<IInvite>('Invite', inviteSchema);

export default Invite;