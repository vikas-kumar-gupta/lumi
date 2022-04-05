import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import {ISubscription} from "../interfaces/model.interface"

const subscriptionSchema = new Schema<ISubscription>({
    subType: {
        type: String,
        enum: DBENUMS.SUBSCRIPTION_TYPE,
        required: true
    },
    subMonths: {
        type: Number,
        required: true
    },
    subStartDate: {
        type: Date,
        required: true
    },
    subEndDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    paymentId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;