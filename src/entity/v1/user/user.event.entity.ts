import { STATUS_MSG, EXCLUDE_DATA } from "../../../constants";
import { HydratedDocument } from 'mongoose'
import UserEvent from "../../../models/user/user_event.model"
import Event from "../../../models/admin/admin.event.model";
import { IEvent, IPayment, IUserEvent } from '../../../interfaces/model.interface'
import Payment from "../../../models/user/payment.model";

export default class UserEventEntity {

    /**
     * @description userEvent details of a userEventId
     * @param userEventId 
     * @returns IUserEvent
     */
    static async userEventDetails(userEventId: any): Promise<IUserEvent> {
        try {
            const userEvent: IUserEvent | null = await UserEvent.findById(userEventId);
            if (userEvent)
                return Promise.resolve(userEvent);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserEventId: ${userEventId}`));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update UserEvent of userEventId
     * @param userEventId 
     * @param update 
     * @returns updated IUserEvent
     */
    static async updateUserEventById(userEventId: any, update: Object): Promise<IUserEvent> {
        try {
            const userEvent: IUserEvent | null = await UserEvent.findByIdAndUpdate(userEventId, update, { new: true });
            if(userEvent)
                return Promise.resolve(userEvent);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserEventId: ${userEventId}`));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

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
            const userEvents: IUserEvent[] = await UserEvent.aggregate([
                {
                    $lookup: {
                        from: 'events',
                        localField: "eventId",
                        foreignField: "_id",
                        as: 'eventData'
                    }
                },
                {
                    $match: {
                        "eventData.eventDate": { $gte: new Date() }
                    }
                },
                {
                    $project: {
                        eventBookingCode: 0,
                        userId: 0,
                        paymentId: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                        "eventData.createdBy": 0,
                        "eventData.bookedBy": 0,
                        "eventData.eventImages": 0,
                        "eventData.freeDrinks": 0,
                        "eventData.ageBetween": 0,
                        "eventData.bookedTickets": 0,
                        "eventData.availableTickets": 0,
                        "eventData.eventDescription": 0,
                        "eventData.totalTickets": 0,
                        "eventData.createdAt": 0,
                        "eventData.updatedAt": 0,
                        "eventData.__v": 0
                    }
                }
            ])

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
    static async findPaymentById(paymentId: any): Promise<IPayment> {
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