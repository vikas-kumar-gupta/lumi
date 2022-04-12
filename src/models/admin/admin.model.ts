import  { DBENUMS } from '../../constants'
import mongoose, { Schema, model } from "mongoose";
import md5 from "md5";

import {IAdmin} from '../../interfaces/model.interface'

const adminSchema = new Schema<IAdmin>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
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
            required: true
        },
        profilePicture: {
            type: [String],
            maxlength: 5,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        geometry: {
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
        height: {
            type: [Number],
            length: 2,
            required: true
        },
        zodiac: {
            type: String,
            enum: DBENUMS.ZODIAC,
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
        isPhoneVerified: {
            type: Boolean,
            required: true
        },
        isMailVerified: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin