import { DBENUMS } from '../constants'
import Joi, { object } from "joi"

export const getOtp = Joi.object({
    phoneNumber: Joi.string().trim().required()
})

export const verifyOtp = Joi.object({
    phoneNumber: Joi.string().trim().required(),
    otp: Joi.string().trim().length(4).required(),
    loginType: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.LOGIN_TYPE)).required()
})

export const updateUser = Joi.object({
    name: Joi.string().trim().min(3).max(20),
    email: Joi.string().trim().min(6),
    gender: Joi.string().trim().valid(...Object.values(DBENUMS.GENDER)),
    dob: Joi.date(),
    profilePicture: Joi.array().length(6),
    bio: Joi.array().length(4),
    location: Joi.object(),
    height: Joi.array().length(2),
    zodiac: Joi.string().min(3).trim().valid(...Object.values(DBENUMS.ZODIAC)),
    interestedIn: Joi.string().trim().valid(...Object.values(DBENUMS.INTERESTS)),
    ageBetween: Joi.array().length(2),
    homeTown: Joi.string().trim().min(1),
    jobTitle: Joi.string().min(5).trim(),
    eduLevel: Joi.string().min(5).trim().valid(...Object.values(DBENUMS.EDU_LEVEL)),
    religiousBelief: Joi.string().min(3).trim().valid(...Object.values(DBENUMS.RELIGIOUS)),
    politicalLeaning: Joi.string().min(3).trim().valid(...Object.values(DBENUMS.POLITICAL_LEANING)),
    haveCigarette: Joi.string().trim().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    haveAlcohol: Joi.string().trim().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    haveMarijuana: Joi.string().trim().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    haveDrugs: Joi.string().trim().valid(...Object.values(DBENUMS.ACCEPTANCE)),
    tokenId: Joi.string(),
    userLocation: Joi.any()
})

export const changePhoneNumber = Joi.object({
    newPhoneNumber: Joi.string().trim().required(),
    tokenId: Joi.string().trim(),
    userLocation: Joi.any()
})

export const verifyMail = Joi.object({
    email: Joi.string().trim().email().required(),
    tokenId: Joi.string().trim(),
    userLocation: Joi.any()
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
    subType: Joi.string().trim().required().valid(...Object.values(DBENUMS.SUBSCRIPTION_PLAN)),
    subMonths: Joi.number().min(1).max(12).required(),
    price: Joi.number().min(1).required(),
    tokenId: Joi.string().trim(),
    userLocation: Joi.any()
})

export const reportProfile = Joi.object({
    reasons: Joi.string().valid(...Object.values(DBENUMS.REPORT_REASON)),
    otherReasons: Joi.string().trim().min(3),
    tokenId: Joi.string().trim(),
    userLocation: Joi.any()
})

export const initPayment = Joi.object({
    price: Joi.number().min(0).required(),
    payTax: Joi.number().min(0).required(),
    payDescription: Joi.string().trim(),
    tokenId: Joi.string().trim(),
    userLocation: Joi.any()
})

export const bookEvent = Joi.object({
    paymentId: Joi.any().required(),
    tokenId: Joi.string().trim(),
    userLocation: Joi.any()
})

export const inviteEvent = Joi.object({
    tokenId: Joi.string().trim(),
    userLocation: Joi.any(),
    isOfferingTicket: Joi.boolean().required()
})