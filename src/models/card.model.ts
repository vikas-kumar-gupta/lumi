import { DBENUMS } from '../constants'
import mongoose, { Schema, model } from "mongoose";

import { ICard } from '../interfaces/model.interface';

const cardSchema = new Schema<ICard>({
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
        required: true,
        minlength: 3
    },
    cardType: {
        type: String,
        enum: DBENUMS.CARD_TYPE,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Card = model<ICard>('Card', cardSchema)

export default Card;