import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import { ISubscription } from "../interfaces/model.interface"

const subscriptionSchema = new Schema<ISubscription>(
    {
        subscriptionPlan: {
            type: String,
            enum: DBENUMS.SUBSCRIPTION_PLAN,
            required: true
        },
        subscriptionMonths: {
            type: Number,
            required: true
        },
        subscriptionStartDate: {
            type: Date,
            required: true
        },
        subscriptionEndDate: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        paymentId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Payment'
        },
    },
    {
        timestamps: true
    })

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;