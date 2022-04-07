import { DBENUMS } from '../constants'
import Joi from "joi"

export const getOtp = Joi.object({
    phoneNumber: Joi.string().trim().required()
})

export const verifyOtp = Joi.object({
    phoneNumber: Joi.string().trim().required(),
    otp: Joi.number().max(9999).required()
})

export const updateUser = Joi.object({
    name: Joi.string().trim().min(3).max(20),
    email: Joi.string().email().trim().min(6),
    gender: Joi.string().trim().uppercase().valid(...Object.values(DBENUMS.USER_GENDER)),
    dob: Joi.date(),
    profilePicture: Joi.array(),
    bio: Joi.array(),
    geometry: Joi.object(),
    height: Joi.array().length(2),
    zodiac: Joi.string().trim().min(3).valid(...Object.values(DBENUMS.ZODIAC)),
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
    tokenId: Joi.string()
})