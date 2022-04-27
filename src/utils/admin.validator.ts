import { DBENUMS } from '../constants'
import Joi from "joi"

export const adminSignup = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    gender: Joi.string().trim().valid(...Object.values(DBENUMS.GENDER)).required(),
    dob: Joi.date(),
    profilePicture: Joi.array(),
    phoneNumber: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    location: Joi.object(),
    homeTown: Joi.string().trim().min(2).required(),
    jobTitle: Joi.string().trim().required(),
    isPhoneVerified: Joi.boolean(),
    isMailVerified: Joi.boolean()

})

export const adminLogin = Joi.object({
    phoneNumber: Joi.string().trim().required(),
    password: Joi.string().required()
})

export const newSubscription = Joi.object({
    subscriptionPlan: Joi.string().trim().valid(...Object.values(DBENUMS.SUBSCRIPTION_PLAN)).required(),
    subscriptionMonths: Joi.number().min(1).required(),
    price: Joi.number().min(0).required(),
    tokenId: Joi.any(),
    userLocation: Joi.any()
})

export const updateSubscription = Joi.object({
    subscriptionPlan: Joi.string().trim().valid(...Object.values(DBENUMS.SUBSCRIPTION_PLAN)),
    subscriptionMonths: Joi.number().min(1),
    price: Joi.number().min(0),
    tokenId: Joi.any(),
    userLocation: Joi.any()
})

export const newEvent = Joi.object({
    createdBy: Joi.any(),
    eventName: Joi.string().min(3).max(25).trim().required(),
    location: Joi.object().required(),
    eventDate: Joi.date().required(),
    eventDescription: Joi.string().min(3).max(200).trim().required(),
    totalTickets: Joi.number().required(),
    availableTickets: Joi.number(),
    bookedTickets: Joi.number().required(),
    ageBetween: Joi.array().length(2).required(),
    freeDrinks: Joi.number().required(),
    price: Joi.number().min(0).required(),
    bookedBy: Joi.array(),
    eventImages: Joi.array(),
    tokenId: Joi.any(),
    userLocation: Joi.any()
})

export const updateEvent = Joi.object({
    eventName: Joi.string().min(3).max(25).trim(),
    location: Joi.object(),
    eventDate: Joi.date(),
    eventDescription: Joi.string().min(3).max(200).trim(),
    totalTickets: Joi.number().min(1),
    availableTickets: Joi.number().min(0),
    ageBetween: Joi.array().length(2),
    freeDrinks: Joi.number().min(0),
    price: Joi.number().min(0),
    bookedBy: Joi.array(),
    eventImages: Joi.array(),
    tokenId: Joi.any(),
    userLocation: Joi.any()
})