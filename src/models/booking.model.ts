import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from "mongoose";
import { IBooking } from '../interfaces/model.interface'

const bookingSchema = new Schema<IBooking>(
    {
        bookingId: {
            type: String,       //  #0123456
            trim: true,
            required: true
        },
        eventId: {
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
        paymentId: {
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

const Booking = model<IBooking>('Booking', bookingSchema)

export default Booking;