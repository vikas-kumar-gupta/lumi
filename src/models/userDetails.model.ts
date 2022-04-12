import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import { IUserDetails } from "../interfaces/model.interface";

const userDetailsSchema = new Schema<IUserDetails>(
    {
        _id: {
            type: mongoose.Types.ObjectId,
            required: true
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
    }
)

const UserDetails = model<IUserDetails>('User_Details', userDetailsSchema);

export default UserDetails;