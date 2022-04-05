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
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
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