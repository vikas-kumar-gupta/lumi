import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from "mongoose";

import { IReport } from "../interfaces/model.interface"

const reportSchema = new Schema<IReport>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        reasons: {
            type: String,
            enum: DBENUMS.REPORT_REASON,
            required: true
        },
        otherReasons: {
            type: String,
            required: false,
            trim: true
        },
        reportedBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        reportedTo: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        isApproved: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Report = model<IReport>('Report', reportSchema);

export default reportSchema
