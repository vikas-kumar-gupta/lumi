import { ISubscription } from '../../../interfaces/model.interface';
import { EXCLUDE_DATA, STATUS_MSG } from '../../../constants'
import mongoose, { HydratedDocument } from 'mongoose'
import Subscription from '../../../models/admin/admin.subscription.model'

export default class AdminSubscriptionEntity {

    /**
     * @description all the subscription list
     * @returns ISubscription[]
     */
    static async allSubscriptions(): Promise<ISubscription[]> {
        try {
            const subscriptions: ISubscription[] = await Subscription.find().select({ ...EXCLUDE_DATA.MONGO });
            return Promise.resolve(subscriptions);
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description subscription details
     * @param suscriptionId 
     * @returns ISusbscription
     */
    static async subscriptionDetails(suscriptionId: mongoose.Types.ObjectId): Promise<ISubscription> {
        try {
            const subscription: ISubscription | null = await Subscription.findById(suscriptionId).select({ ...EXCLUDE_DATA.MONGO });
            if (subscription)
                return Promise.resolve(subscription)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`SubscriptionId: ${suscriptionId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
    /**
     * @description create new subscription
     * @param options 
     * @returns Status object
     */
    static async newSubscription(options: Object): Promise<ISubscription> {
        try {
            const subscription: HydratedDocument<ISubscription> = new Subscription(options);
            await subscription.save()
            return Promise.resolve(subscription);
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update the existing subscription
     * @param subscriptionId 
     * @param update 
     * @returns status object
     */
    static async updateSubscription(subscriptionId: any, update: any): Promise<ISubscription> {
        try {
            const subscription: ISubscription | null = await Subscription.findByIdAndUpdate(subscriptionId, update, { new: true });
            if (subscription)
                return Promise.resolve(subscription)
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`SubscriptionId: ${subscriptionId}`));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description delete the existing subscription
     * @param subscriptionId 
     * @returns ISubscription
     */
    static async deleteSubscription(subscriptionId: any): Promise<ISubscription> {
        try {
            const subscription: ISubscription | null = await Subscription.findByIdAndDelete(subscriptionId);
            if (subscription)
                return Promise.resolve(subscription);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`SubscriptionId: ${subscriptionId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}