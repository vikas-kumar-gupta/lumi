import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import { IUserDetails } from "../interfaces/model.interface";

const userDetailsSchema = new Schema<IUserDetails>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subscription: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    bio: {
        type: [String],
        required: false
    },
    location: {
        // schema of location
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    height: {
        type: [Number],
        required: true
    },
    interestedIn: {
        type: String,
        enum: DBENUMS.INTERESTS,
        required: true
    },
    ageBetween: {
        type: [Number],
        required: true
    },
    homeTown: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    eduLevel: {
        type: String,
        required: true
    },
    religiousBelief: {
        type: String,
        enum: DBENUMS.RELIGIOUS,
        required: true
    },
    politicalLeaning: {
        type: String,
        enum: DBENUMS.POLITICAL_LEANING,
        required: true
    },
    haveCigares: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: true
    },
    haveAlcohol: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: true
    },
    haveMarijuana: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: true
    },
    haveDrugs: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: true
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
    reportNum: {
        type: Number,
        default: 0,
        required: true
    }
})

const UserDetails = model<IUserDetails>('User_Details', userDetailsSchema);

export default UserDetails;