import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import { IEvent } from "../interfaces/model.interface";

const eventSchema = new Schema<IEvent>({
    eventName: {
        type: String,
        required: true
    },
    bookingId: {
        type: String,
        required: true
    },
    geometry: {
        // schema of location
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    availableTicks: {
        type: Number,
        required: true
    },
    ageBetween: {
        type: [Number],
        required: true
    },
    attendeesNumber: {
        type: Number,
        required: true
    },
    freeDrinks: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    bookedBy: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    eventImages: {
        type: [String],
        required: false
    },
    attendees: {
        type: [mongoose.Types.ObjectId],
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

const Event = model<IEvent>('Event', eventSchema);

export default Event;