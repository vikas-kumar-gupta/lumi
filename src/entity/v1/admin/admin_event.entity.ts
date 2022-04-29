import { STATUS_MSG } from '../../../constants'
import mongoose, { HydratedDocument } from 'mongoose'
import Event from '../../../models/admin/admin.event.model'
import { IEvent } from '../../../interfaces/model.interface';

export default class AdminEvent {

    /**
     * @description create new event by admin
     * @param adminId 
     * @param bodyData 
     * @returns status object
     */
    static async newEvent(options: object): Promise<IEvent> {
        try {
            // await newEvent.validateAsync({ createdBy: adminId, ...bodyData });
            const event: HydratedDocument<IEvent> = new Event(options);
            await event.save();
            return Promise.resolve(event)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update existing event
     * @param eventId 
     * @param options 
     * @returns Status obj
     */
    static async updateEvent(eventId: any, options: Object): Promise<IEvent> {
        try {
            const event: IEvent | null = await Event.findByIdAndUpdate(new mongoose.Types.ObjectId(eventId), options, { new: true });
            if (event)
                return Promise.resolve(event)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`EventId: ${eventId}`))
        }
        catch (err: any) {
            return Promise.reject(err)
        }
    }

    /**
     * @description delete an event of given eventId
     * @param eventId 
     * @returns status obj
     */
    static async deleteEvent(eventId: any): Promise<IEvent> {
        try {
            const event: IEvent | null = await Event.findByIdAndDelete(new mongoose.Types.ObjectId(eventId));
            if (event)
                return Promise.resolve(event);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`Eventid: ${eventId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}