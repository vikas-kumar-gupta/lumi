import { ISubscription } from '../../../interfaces/model.interface';
import { STATUS_MSG } from '../../../constants'
import mongoose, { HydratedDocument } from 'mongoose'
import Subscription from '../../../models/admin/admin.subscription.model'
import { newSubscription, updateSubscription } from '../../../utils/admin.validator';
export default class AdminSubscription {
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
     * @param options 
     * @returns status object
     */
    static async updateSubscription(subscriptionId: any, options: any): Promise<ISubscription> {
        try {
            const subscription: ISubscription | null = await Subscription.findByIdAndUpdate(new mongoose.Types.ObjectId(subscriptionId), options, { new: true });
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
     * @param bodyData 
     * @returns 
     */
    static async deleteSubscription(subscriptionId: any, bodyData: any): Promise<ISubscription> {
        try {
            const subscription: ISubscription | null = await Subscription.findByIdAndDelete(new mongoose.Types.ObjectId(subscriptionId));
            if (subscription)
                return Promise.resolve(subscription);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`SubscriptionId: ${subscriptionId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}