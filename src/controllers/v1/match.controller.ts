import { CONFIG, STATUS_MSG, DATE } from '../../constants'
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import User from '../../models/user.model'
import UserDetails from '../../models/userDetails.model'

/**
 * ! matching algorithm to be implemented more accurately
 */
 export const mayBeMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.body.tokenId);
        if (user != undefined) {
            const interestedUsers = await User.find({ interestedIn: user.interestedIn })
            if (interestedUsers) {
                res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS('').statusCode).json(interestedUsers)
            }
        } else {
            res.status(STATUS_MSG.ERROR.TOKEN_EXPIRED.statusCode).json(STATUS_MSG.ERROR.TOKEN_EXPIRED)
        }
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.BAD_REQUEST.statusCode).json(STATUS_MSG.ERROR.BAD_REQUEST)
    }
}

/**
 * !matching algorithm to be implemented more accurately
 */

 export const matches = async (req: Request, res: Response, next: NextFunction) => {
    console.log('/match');
}

export const matchProfile = async (req: Request, res: Response, next: NextFunction) => {
    console.log('/match/:userId/profile');
    try {
        const userId = req.params.userId
        const user = await User.findOne({ _id: userId})
        if(user){
            res.status(STATUS_MSG.SUCCESS.DEFAULT.statusCode).json(user)
        }
        else{
            res.status(STATUS_MSG.ERROR.NOT_EXIST('').statusCode).json(STATUS_MSG.ERROR.NOT_EXIST(`user_id ${userId}`))
        }
    }
    catch (err) {
        next(err)
    }
}

export const matchProfileReport = async (req: Request, res: Response, next: NextFunction) => {
    console.log('/match/:userId/report'); 
    try {
        
    }
    catch (err) {

    }
}

export const matchProfileBlock = async (req: Request, res: Response, next: NextFunction) => {
    console.log('/match/:userid/block');
}

/**
 *  recieves data for booking ticken for both user
 */
export const matchProfileInviteEvent = async (req: Request, res: Response, next: NextFunction) => {
    console.log('/match/:userid/:eventid/invite');
}