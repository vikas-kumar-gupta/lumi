import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";
import { IPayment } from "../interfaces/model.interface";

const paymentSchema = new Schema<IPayment>(
    {
        payId: {
            type: String,
            trim: true,
            required: true
        },
        payDate: {
            type: Date,
            required: true
        },
        payBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        amount: {
            type: Number,
            min: 1,
            required: true
        },
        payTax: {
            type: Number,
            min: 0,
            default: 0,
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
        }
    },
    {
        timestamps: true
    }
)

const Payment = model<IPayment>('Payment', paymentSchema)

export default Payment;