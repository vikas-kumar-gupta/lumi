import  { DBENUMS } from '../../constants'
import mongoose, { Schema, model } from "mongoose";
import md5 from "md5";

import {IAdmin} from '../../interfaces/model.interface'

const adminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            required: true
        },
        gender: {
            type: String,
            enum: DBENUMS.GENDER,
            required: true
        },
        dob: {
            type: Date,
            required: false
        },
        profilePicture: {
            type: [String],
            maxlength: 5,
            required: false
        },
        phoneNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: false
            },
            coordinates: {
                type: [Number],
                length: 2,
                required: false
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
        isPhoneVerified: {
            type: Boolean,
            default: false,
            required: false
        },
        isMailVerified: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    {
        timestamps: true
    }
)

/**
 * @description password hashisng
 */
adminSchema.pre('save', function(next) {
    try {
        if(this.isModified('password') || this.isNew) {
            this.password = md5(this.password.toString())
        }
        next()
    }
    catch (err: any) {
        next(err)
    }
})

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin