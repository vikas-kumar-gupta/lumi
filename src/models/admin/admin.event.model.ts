import { DBENUMS } from "../../constants";
import mongoose, { Schema, model } from "mongoose";
import { IEvent } from "../../interfaces/model.interface";

const eventSchema = new Schema<IEvent>(
    {
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
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                length: 2,
                required: true
            }
        },
        eventDate: {
            type: Date,
            required: true
        },
        eventDescription: {
            type: String,
            trim: true,
            required: true,
        },
        eventStatus: {
            type: String,
            enum: DBENUMS.EVENT_STATUS,
            required: false
        },
        totalTickets: {
            type: Number,
            min: 1,
            required: true
        },
        availableTickets: {
            type: Number,
            min: 0,
            required: true
        },
        bookedTickets: {
            type: Number,
            default: 0,
            required: false
        },
        ageBetween: {
            type: [Number],
            length: 2,
            required: true
        },
        freeDrinks: {
            type: Number,
            min: 0,
            default: 0,
            required: false
        },
        price: {
            type: Number,
            min: 0,
            default: 0,
            required: false
        },
        bookedBy: {
            type: [mongoose.Types.ObjectId],
            ref: 'User',
            required: false
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