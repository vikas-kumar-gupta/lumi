import { DBENUMS } from "../../constants";
import mongoose, { Schema, model } from "mongoose";
import { IPayment } from "../../interfaces/model.interface";

const paymentSchema = new Schema<IPayment>(
    {
        userId: {
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
        grandTotal: {
            type: Number,
            required: false
        },
        payStatus: {
            type: String,
            enum: DBENUMS.PAYMENT_STATUS,
            default: DBENUMS.PAYMENT_STATUS[0],
            required: true
        },
        payTransactionId: {
            type: String,
            required: false
        },
        payDescription: {
            type: String,
            dafault: "Something here",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Payment = model<IPayment>('Payment', paymentSchema)

export default Payment;