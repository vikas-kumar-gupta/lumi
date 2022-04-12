import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from "mongoose";

import { ICard } from '../interfaces/model.interface';

const cardSchema = new Schema<ICard>(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        nameOnCard: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        cardNumber: {
            type: Number,
            required: true
        },
        expDate: {
            type: Date,
            required: true
        },
        cvv: {
            type: Number,
            minlength: 3,
            maxlength: 3,
            required: true
        },
        cardType: {
            type: String,
            enum: DBENUMS.CARD_TYPE,
            required: true
        },
        cardStatus: {
            type: String,
            enum: DBENUMS.CARD_STATUS,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Card = model<ICard>('Card', cardSchema)

export default Card;