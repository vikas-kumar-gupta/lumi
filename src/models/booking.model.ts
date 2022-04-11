import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from "mongoose";
import { IBooking } from '../interfaces/model.interface'

const bookingSchema = new Schema<IBooking>(
    {
        bookingId: {
            type: String,
            required: true
        },
        eventDetails: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        bookedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        bookedFor: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        paymentDetails: {
            type: Schema.Types.ObjectId,
            ref: 'Payment',
            required: true
        },
        bookingStatus: {
            type: String,
            enum: DBENUMS.BOOKING_STATUS,
            required: true
        }
    },
    {
        timestamps: true
    }
)