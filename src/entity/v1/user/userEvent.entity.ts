import { STATUS_MSG } from "../../../constants";
import mongoose, { Schema, model } from 'mongoose'
import UserEvent from "../../../models/user_event.model"
import Event from "../../../models/admin/admin.event.model";
import { IEvent, IUserEvent } from '../../../interfaces/model.interface'

export default class UserEventEntity {

    /**
     * @description get event details
     * @param eventId 
     * @returns Event
     */
    static async eventDetails(eventId: any): Promise<Object> {
        try {
            const event: IEvent | null = await Event.findById(new mongoose.Types.ObjectId(eventId));
            if (event)
                return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('Event'), data: event })
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('Event'))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description list of user booked events
     * @param userId 
     * @returns Event[]
     */
    static async myEvents(userId: any): Promise<Object> {
        try {
            const userEvents: IUserEvent[] = await UserEvent.find({ userId: userId })
            return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('My events'), data: userEvents})
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description all the events near user
     * @returns Event[]
     */
    static async allEvents(): Promise<Object> {
        try {
            const events: IEvent[] = await Event.find();
            return Promise.resolve({ ...STATUS_MSG.SUCCESS.FETCH_SUCCESS('All event'), data: events})
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async bookEvent() {
        try {
            // booking of an event is to implemented here
        }
        catch (err) {

        }
    }
}