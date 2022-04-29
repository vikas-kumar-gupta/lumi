import { STATUS_MSG, EXCLUDE_DATA } from "../../../constants";
import mongoose from 'mongoose'
import UserEvent from "../../../models/user_event.model"
import Event from "../../../models/admin/admin.event.model";
import { IEvent, IUserEvent } from '../../../interfaces/model.interface'

export default class UserEventEntity {

    /**
     * @description get event details
     * @param eventId 
     * @returns Event
     */
    static async eventDetails(eventId: any): Promise<IEvent> {
        try {
            const event: IEvent | null = await Event.findById(new mongoose.Types.ObjectId(eventId), { ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.EVENT });
            if (event)
                return Promise.resolve(event)
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
    static async myEvents(userId: any): Promise<IUserEvent[]> {
        try {
            const userEvents: IUserEvent[] = await UserEvent.find({ userId: userId }).select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.EVENT });
            return Promise.resolve(userEvents)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description all the events near user
     * @returns Event[]
     */
    static async allEvents(userLocation: any): Promise<IEvent[]> {
        try {
            const options = {
                //  for near by location of 50 miles
                location: {
                    $geoWithin: {
                        $centerSphere: [[userLocation.coordinates[0], userLocation.coordinates[1]], 50 / 3963.2]
                    }
                },
                //  for upcoming or ongoing events
                eventDate: {
                    $gte: new Date()
                }
            }
            const events: IEvent[] = await Event.find(options).select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.EVENT });
            return Promise.resolve(events)
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