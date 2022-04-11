import { DBENUMS } from "../constants";
import md5 from 'md5'
import mongoose, { Schema, model } from "mongoose";

import { IUser } from "../interfaces/model.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 25,
        required: false
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: false
    },
    gender: {
        type: String,
        enum: DBENUMS.USER_GENDER,
        required: false
    },
    dob: {
        type: Date,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    profilePicture: {
        type: [String],
        required: false
    },
    isPhoneVerified: {
        type: Boolean,
        required: true
    },    
    isMailVerified: {
        type: Boolean,
        default: false,
        required: false
    },
    subscription: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Subscription'
    },
    bio: {
        type: [String],
        required: false
    },
    geometry: {
        // schema of location
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    homeTown: {
        type: String,
        required: false,
        trim: true,
        minlength: 2
    },
    jobTitle: {
        type: String,
        required: false,
        trim: true,
        minlength: 2
    },
    eduLevel: {
        type: String,
        required: false,
    },
    religiousBelief: {
        type: String,
        enum: DBENUMS.RELIGIOUS,
        required: false
    },
    haveCigares: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: false
    },
    haveAlcohol: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: false
    },
    haveMarijuana: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: false
    },
    haveDrugs: {
        type: String,
        enum: DBENUMS.ACCEPTANCE,
        required: false
    },
    politicalLeaning: {
        type: String,
        enum: DBENUMS.POLITICAL_LEANING,
        required: false
    },
    ageBetween: {
        type: [Number],
        required: false
    },
    height: {
        type: [Number],
        required: false
    },    
    interestedIn: {
        type: String,
        enum: DBENUMS.INTERESTS,
        required: false
    },
    zodiac: {
        type: String,
        enum: DBENUMS.ZODIAC,
        required: false
    },
    reportNum: {
        type: Number,
        default: 0,
        required: false
    }
},
{
    timestamps: true
})

const User = model<IUser>('User', userSchema);

export default User;