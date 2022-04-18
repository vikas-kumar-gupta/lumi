import { subscription } from './user.validator';
import { DBENUMS } from '../constants'
import Joi, { object } from "joi"

export const newSubscription = Joi.object({
    subscriptionPlan: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.SUBSCRIPTION_PLAN)).required(),
    subscriptionMonths: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    tokenId: Joi.object()
})

export const updateSubscription = Joi.object({
    subscriptionPlan: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.SUBSCRIPTION_PLAN)),
    subscriptionMonths: Joi.number().min(1),
    price: Joi.number().min(0),
    tokenId: Joi.object()
})

export  const deleteSubscription = Joi.object({
    subscriptionId: Joi.object().required(),
    tokenId: Joi.object()
})

export const newEvent = Joi.object({
    createdBy: Joi.object(),
    eventName: Joi.string().min(3).max(25).trim().required(),
    geometry: Joi.object().required(),
    eventDate: Joi.date().required(),
    eventDescription: Joi.string().min(3).max(200).trim().required(),
    totalTickets: Joi.number().required(),
    availableTickets: Joi.number(),
    bookedTickets: Joi.number().required(),
    ageBetween: Joi.array().length(2).required(),
    freeDrinks: Joi.number().required(),
    price: Joi.number().min(1).required(),
    bookedBy: Joi.array(),
    eventImages: Joi.array(),
    tokenId: Joi.string()
})

export const updateEvent = Joi.object({
    eventName: Joi.string().min(3).max(25).trim(),
    geometry: Joi.object(),
    eventDate: Joi.date(),
    eventDescription: Joi.string().min(3).max(200).trim(),
    totalTickets: Joi.number(),
    availableTickets: Joi.number(),
    bookedTickets: Joi.number(),
    ageBetween: Joi.array().length(2),
    freeDrinks: Joi.number(),
    price: Joi.number().min(1),
    bookedBy: Joi.array(),
    eventImages: Joi.array(),
    tokenId: Joi.string()
})