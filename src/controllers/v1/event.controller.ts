import { STATUS_MSG } from '../../constants'
import express, { Request, Response, NextFunction } from 'express';

import * as validate from '../../utils/validator'
import { IEvent } from '../../interfaces/model.interface'
import Event from '../../models/event.model'

export const addEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body.tokenId);

        const { 
            eventName, 
            geometry, 
            eventDate, 
            eventDescription, 
            totalTickets, 
            availableTickets, 
            bookedTickets, 
            ageBetween, 
            freeDrinks,
            price,
            bookedBy,
            eventImages,
        } = req.body
        await validate.event.validateAsync(req.body)
        
        const query = {
            createdBy: req.body.tokenId,
            eventName: eventName,
            geometry: geometry,
            eventDate: eventDate,
            eventDescription: eventDescription,
            totalTickets: totalTickets,
            availableTickets: availableTickets,
            bookedTickets: bookedTickets,
            ageBetween: ageBetween,
            freeDrinks: freeDrinks,
            price: price,
            bookedBy: bookedBy,
            eventImages: eventImages
        }
        const event = new Event(query);
        event.save(err => {
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

export const allEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await Event.find();
        if(events != undefined) {
            res.status(STATUS_MSG.SUCCESS.FETCH_SUCCESS("").statusCode).json(events)
        }
    }
    catch (err) {
        next(err)
    }
}

/**
 * TODO:
 * Given below each controller is to be implemented
 */

export const bookEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // booking of an event is to implemented here
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