import { DBENUMS } from "../../constants";
import mongoose, { Schema, model } from "mongoose";

import { ISubscription } from "../../interfaces/model.interface"

const subscriptionSchema = new Schema<ISubscription>(
    {
        subscriptionPlan: {
            type: String,
            enum: DBENUMS.SUBSCRIPTION_PLAN,
            required: true
        },
        subscriptionMonths: {
            type: Number,
            min: 0,
            max: 12,
            required: true
        },
        price: {
            type: Number,
            min: 0,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;