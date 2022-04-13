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