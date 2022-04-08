import { DBENUMS } from "../constants";
import mongoose, { Schema, model } from "mongoose";

import { IEvent } from "../interfaces/model.interface";

const eventSchema = new Schema<IEvent>({
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    eventName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 25
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
        required: true,
    },
    totalTickets: {
        type: Number,
        required: true
    },
    availableTickets: {
        type: Number,
        required: true
    },
    bookedTickets: {
        type: Number,
        default: 0,
        required: true
    },
    ageBetween: {
        type: [Number],
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
        required: false,
        ref: 'User'
    },
    eventImages: {
        type: [String],
        required: false
    }
},
    {
        timestamps: true
    }
)

const Event = model<IEvent>('Event', eventSchema);

export default Event;