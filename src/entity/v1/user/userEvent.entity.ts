import Event from "../../../models/admin/admin.event.model";
import {IEvent} from '../../../interfaces/model.interface'
import { STATUS_MSG } from "../../../constants";

export default class UserEventEntity {

    /**
     * @description to fetch all the events available for user
     */
    static async allEvents(): Promise<IEvent[] | void> {
        try {
            const events: IEvent[] = await Event.find();
            return events;
        }
        catch (err) {
            return Promise.reject(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while fetching events'));
        }
    }
}