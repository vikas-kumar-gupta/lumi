import { DBENUMS } from '../constants'
import Joi, { object } from "joi"

export const getOtp = Joi.object({
    phoneNumber: Joi.string().trim().required()
})

export const verifyOtp = Joi.object({
    phoneNumber: Joi.string().trim().required(),
    otp: Joi.string().trim().length(4).required()
})

export const updateUser = Joi.object({
    name: Joi.string().trim().min(3).max(20),
    email: Joi.string().trim().min(6),
    gender: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.GENDER)),
    dob: Joi.date(),
    profilePicture: Joi.array(),
    bio: Joi.array(),   
    geometry: Joi.object(),
    height: Joi.array().length(2),
    zodiac: Joi.string().min(3).uppercase().trim().valid(...Object.values(DBENUMS.ZODIAC)),
    interestedIn: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.INTERESTS)),
    ageBetween: Joi.array().length(2),
    homeTown: Joi.string().trim().min(5).max(30),
    jobTitle: Joi.string().min(5).trim(),
    eduLevel: Joi.string().min(5).trim().uppercase().valid(...Object.values(DBENUMS.EDU_LEVEL)),
    religiousBelief: Joi.string().min(3).trim().uppercase().valid(...Object.values(DBENUMS.RELIGIOUS)),
    politicalLeaning: Joi.string().min(3).trim().uppercase().valid(...Object.values(DBENUMS.POLITICAL_LEANING)),
    haveCigares: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    haveAlcohol: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    haveMarijuana: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    haveDrugs: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    isMailVerified: Joi.boolean(),
    tokenId: Joi.string(),
})

export const changePassword = Joi.object({
    currentPassword: Joi.string().length(8).required(),
    newPassword: Joi.string().length(8).required(),
    confirmNewPassword: Joi.string().length(8).required(),
    tokenId: Joi.string().trim()
})

export const changePhoneNumber = Joi.object({
    newPhoneNumber: Joi.string().trim().required(),
    tokenId: Joi.string().trim()
})

export const verifyMail = Joi.object({
    email: Joi.string().trim().email().required(),
    tokenId: Joi.string().trim()
})

export const event = Joi.object({
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

export const payment = Joi.object({
    nameOnCard: Joi.string().trim().uppercase().required(),
    cardNumber: Joi.number().required(),
    expDate: Joi.date().required(),
    cvv: Joi.number().min(1).max(999).required(),
    amount: Joi.number().required(),
    payTax: Joi.number().required(),
    total: Joi.number().required(),
})

export const subscription = Joi.object({
    subType: Joi.string().trim().uppercase().required().valid(...Object.values(DBENUMS.SUBSCRIPTION_PLAN)),
    subMonths: Joi.number().min(1).max(12).required(),
    price: Joi.number().min(1).required(),
})

export const reportUser = Joi.object({
    reasons: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.REPORT_REASON)),
    otherReasons: Joi.string().trim().min(3)
})

export const card = Joi.object({
    nameOnCard: Joi.string().trim().uppercase().required(),
    cardNumber: Joi.number().required(),
    expDate: Joi.date().required(),
    cvv: Joi.number().min(1).max(999).required(),
    cardType: Joi.string().trim().uppercase().required().valid(...Object.values(DBENUMS.CARD_TYPE))
})
