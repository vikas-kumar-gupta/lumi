import { CONFIG, STATUS_MSG, DATE } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import User from '../../../models/user.model'
import UserDetails from '../../../models/userDetails.model'
import { sendErrorResponse } from '../../../utils/utils'

/**
 * ! matching algorithm to be implemented more accurately
 */
export const mayBeMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matches = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matchProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matchProfileReport = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matchProfileBlock = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}

export const matchProfileInviteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }
    catch (err) {
        const errData = sendErrorResponse(err);
        res.status(errData.statusCode).json(errData)
    }
}
