import { STATUS_MSG, EXCLUDE_DATA } from "../../../constants";
import { HydratedDocument } from 'mongoose'
import UserEvent from "../../../models/user/user_event.model"
import Event from "../../../models/admin/admin.event.model";
import { IEvent, IPayment, IUserEvent } from '../../../interfaces/model.interface'
import Payment from "../../../models/user/payment.model";

export default class UserEventEntity {

    /**
     * @description get event details
     * @param eventId 
     * @returns Event
     */
    static async eventDetails(eventId: any): Promise<IEvent> {
        try {
            const event: IEvent | null = await Event.findById(eventId, { ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.EVENT });
            if (event)
                return Promise.resolve(event)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST('Event'))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description updating an existing event by its eventId
     * @param eventId 
     * @param options 
     * @returns IEvent
     */
    static async updateEventDetails(eventId: any, options: Object): Promise<IEvent> {
        try {
            const event: IEvent | null = await Event.findByIdAndUpdate(eventId, options, { new: true });
            if (event)
                return Promise.resolve(event);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`EventId: ${eventId}`));
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
            const userEvents: IUserEvent[] = await UserEvent.find({ userId })
                .sort({ $natural: -1 })
                .populate({
                    path: 'eventId',
                    select: 'eventName price location eventDate'
                })
                .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.EVENT });
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
            const events: IEvent[] = await Event.find(options)
                .sort({ $natural: -1 })
                .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.EVENT });
            return Promise.resolve(events)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description all the details of a payment of paymentId
     * @param paymentId 
     * @returns IPayment
     */
    static async paymentDetails(paymentId: any): Promise<IPayment> {
        try {
            const payment: IPayment | null = await Payment.findById(paymentId);
            if (payment)
                return Promise.resolve(payment)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`PaymentId: ${paymentId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description creating a new userEvent
     * @param options 
     * @returns IUserEvent
     */
    static async bookEvent(options: Object): Promise<IUserEvent> {
        try {
            const userEvent: HydratedDocument<IUserEvent> = new UserEvent(options);
            await userEvent.save();
            return Promise.resolve(userEvent);
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}