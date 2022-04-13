import { STATUS_MSG } from '../../../constants'
import express, { Request, Response, NextFunction } from 'express';

import * as validate from '../../../utils/user.validator'
import Event from '../../../models/admin/admin.event.model'

export const newEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.tokenId);

        const {
            eventName,
            geometry,
            eventDate,
            eventDescription,
            eventStatus,
            totalTickets,
            availableTickets,
            bookedTickets,
            ageBetween,
            freeDrinks,
            price,
            eventImages,
        } = req.body
        await validate.event.validateAsync(req.body)

        const query = {
            createdBy: req.body.tokenId,
            eventName: eventName,
            geometry: geometry,
            eventDate: eventDate,
            eventDescription: eventDescription,
            eventStatus: eventStatus,
            totalTickets: totalTickets,
            availableTickets: availableTickets,
            bookedTickets: bookedTickets,
            ageBetween: ageBetween,
            freeDrinks: freeDrinks,
            price: price,
            eventImages: eventImages
        }
        const event = new Event(query);
        event.save((err: any) => {
            if (err) {
                throw new Error(err.message)
            }
            res.status(STATUS_MSG.SUCCESS.CREATED.statusCode).json(STATUS_MSG.SUCCESS.CREATED);
        })
    }
    catch (err) {
        next(err)
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // to bbe implemented
    }
    catch (err) {

    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //  deleting of an event is to be implemented
    }
    catch (err) {

    }
}