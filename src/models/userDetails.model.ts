import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import { IUserDetails } from "../interfaces/model.interface";

const userDetailsSchema = new Schema<IUserDetails>({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    matches: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'User'
    },
    myEvents: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'Event'
    },
    invitesSend: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'Invite'
    },
    invitesReceive: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'Invite'
    },
    savedCards: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'Card'
    },
    blockedUsers: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'User'
    },
    reportUsers: {
        type: [mongoose.Types.ObjectId],
        required: false,
        ref: 'User'
    }
},
{
    timestamps: true,
})

const UserDetails = model<IUserDetails>('User_Details', userDetailsSchema);

export default UserDetails;