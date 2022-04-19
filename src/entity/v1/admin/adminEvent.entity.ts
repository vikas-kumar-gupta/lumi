import { STATUS_MSG } from '../../../constants'
import mongoose, { HydratedDocument } from 'mongoose'
import { newEvent, updateEvent } from '../../../utils/admin.validator'
import Event from '../../../models/admin/admin.event.model'
import { IEvent } from '../../../interfaces/model.interface';
export default class AdminEvent {

    /**
     * @description create new event by admin
     * @param adminId 
     * @param bodyData 
     * @returns status object
     */
    static async newEvent(adminId: any, bodyData: Object): Promise<Object | void> {
        try {
            await newEvent.validateAsync({ createdBy: adminId, ...bodyData });
            const event: HydratedDocument<IEvent> = new Event({ createdBy: adminId, ...bodyData });
            await event.save();
            return Promise.resolve(STATUS_MSG.SUCCESS.CREATED)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update existing event
     * @param eventId 
     * @param bodyData 
     * @returns Sttaus obj
     */
    static async updateEvent(eventId: any, bodyData: Object): Promise<Object> {
        try {
            await updateEvent.validateAsync(bodyData);
            const updatedEvent: IEvent | null = await Event.findByIdAndUpdate(new mongoose.Types.ObjectId(eventId), bodyData);
            if (updatedEvent)
                return Promise.resolve(STATUS_MSG.SUCCESS.UPDATED)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`EventId: ${eventId}`))
        }
        catch (err: any) {
            return Promise.reject(err)
        }
    }

    static async deleteEvent(eventId: any): Promise<Object> {
        try {
            const delEvent: IEvent | null = await Event.findByIdAndDelete(new mongoose.Types.ObjectId(eventId));
            if (delEvent)
                return Promise.resolve(STATUS_MSG.SUCCESS.DELETED);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`Eventid: ${eventId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}