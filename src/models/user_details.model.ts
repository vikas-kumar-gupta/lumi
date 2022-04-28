import { Schema, model } from "mongoose";
import { IUserDetails } from "../interfaces/model.interface";

const userDetailsSchema = new Schema<IUserDetails>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        blockedUsers: {
            type: [Schema.Types.ObjectId],
            required: false,
            ref: 'User'
        },
        reportedUsers: {
            type: [Schema.Types.ObjectId],
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