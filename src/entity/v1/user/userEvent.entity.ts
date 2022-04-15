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
    static async eventDetails(eventId: Schema.Types.ObjectId): Promise<IEvent> {
        try {
            const event: IEvent | null = await Event.findById(eventId);
            if (event)
                return Promise.resolve(event);
            throw new Error()
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('Event'))
        }
    }

    /**
     * @description list of user booked events
     * @param userId 
     * @returns Event[]
     */
    static async myEvents (userId: Schema.Types.ObjectId): Promise<IUserEvent[]>{
        try {
            const userEvents: IUserEvent[] = await UserEvent.find({userId: userId})
            return Promise.resolve(userEvents)
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST)
        }
    }

    /**
     * @description all the events near user
     * @returns Event[]
     */
    static async allevents(): Promise<IEvent[]> {
        try {
            const events: IEvent[] = await Event.find();
            return Promise.resolve(events)
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.BAD_REQUEST)
        }
    }

    static async bookEvent() {
        try {

        }
        catch (err) {

        }
    }
}