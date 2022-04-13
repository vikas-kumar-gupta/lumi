import { STATUS_MSG } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';

import Event from '../../../models/admin/admin.event.model'

export const myEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // here user registered event will be displayed
    }
    catch (err) {

    }
}

export const eventDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // here user registered event will be displayed
    }
    catch (err) {

    }
}

export const allEvents = async (req: express.Request, res: express.Response) => {
    try {
        const events = await Event.find();
        if (events != undefined) res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS("").statusCode).json(events)
    }
    catch (err) {
        res.status(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('').statusCode).json(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while fetching events'))
    }
}

export const bookEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // booking of an event is to implemented here
    }
    catch (err) {
        
    }
}