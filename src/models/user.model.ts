import { DBENUMS } from "../constants";
import md5 from 'md5'
import mongoose, { Schema, model } from "mongoose";

import { IUser } from "../interfaces/model.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true  
    },
    gender: {
        type: String,
        enum: DBENUMS.USER_GENDER,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: false
    },
    profilePicture: {
        type: [String],
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false,
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
    geometry: {
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
    politicalLeaning: {
        type: String,
        enum: DBENUMS.POLITICAL_LEANING,
        required: true
    },
    ageBetween: {
        type: [Number],
        required: true
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
    reportNum: {
        type: Number,
        default: 0,
        required: true
    },
    userDetails: {
        type: Schema.Types.ObjectId,
        ref: 'User_Details',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

// hashing password using pre hook
userSchema.pre('save', function (next) {
    try{
        if(this.isModified('password') || this.isNew) {
            this.password = md5(this.password)
        }
        next()
    }
    catch(err: any) {
        next(err)
    }
})

const User = model<IUser>('User', userSchema);

export default User;