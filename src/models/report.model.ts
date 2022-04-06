import {DBENUMS} from '../constants'
import mongoose, { Schema, model } from "mongoose";

import {IReport} from "../interfaces/model.interface"

const reportSchema = new Schema<IReport>({
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
        required: true
    },
    reportedTo: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})

const Report = model<IReport>('Report', reportSchema);

export default reportSchema
