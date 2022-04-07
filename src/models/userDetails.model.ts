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
        required: false
    },
    myEvents: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    invitesSend: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    invitesReceive: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    savedCards: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    blockedUsers: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    reportUsers: {
        type: [mongoose.Types.ObjectId],
        required: false
    },

    // createdAt: {
    //     type: Date,
    //     required: true
    // },
    // updatedAt: {
    //     type: Date,
    //     required: false
    // }
},
{
    timestamps: true,
})

const UserDetails = model<IUserDetails>('User_Details', userDetailsSchema);

export default UserDetails;