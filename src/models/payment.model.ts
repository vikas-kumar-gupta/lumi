import { DBENUMS } from "../constants";
import mongoose, {Schema, model} from "mongoose";

import { IPayment } from "../interfaces/model.interface";

const paymentSchema = new Schema<IPayment>({
    nameOnCard: {
        type: String,
        required: true
    },
    cardNumber: { 
        type: Number,
        required: true
    },
    expDate: {
        type: Date,
        required: true
    },
    payDate: {
        type: Date,
        required: true
    },
    payBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    payTo: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    amount: { 
        type: Number,
        required: true
    },
    payTax: { 
        type: Number,
        required: false
    },
    total: { 
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: DBENUMS.PAYMENT_STATUS,
        required: true
    },
    payId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Payment = model<IPayment>('Payment', paymentSchema)

export default Payment;