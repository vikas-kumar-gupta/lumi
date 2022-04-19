import { ISubscription } from './../../../interfaces/model.interface';
import { STATUS_MSG } from '../../../constants'
import mongoose, { HydratedDocument } from 'mongoose'
import Event from '../../../models/admin/admin.event.model';
import Subscription from '../../../models/admin/admin.subscription.model'
import { newSubscription, updateSubscription, deleteSubscription } from './../../../utils/admin.validator';
export default class AdminSubscription {
    /**
     * @description create new subscription
     * @param bodyData 
     * @returns Status object
     */
    static async newSubscription(bodyData: any): Promise<Object | void> {
        try {
            await newSubscription.validateAsync(bodyData);
            const subscription: HydratedDocument<ISubscription> = new Subscription(bodyData);
            subscription.save((err) => {
                if (err)
                    return Promise.reject(err)
                return Promise.resolve(STATUS_MSG.SUCCESS.CREATED)
            })
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description update the existing subscription
     * @param subscriptionId 
     * @param bodyData 
     * @returns status object
     */
    static async updateSubscription(subscriptionId: any, bodyData: any): Promise<Object | void> {
        try {
            await updateSubscription.validateAsync(bodyData);
            const subscription: ISubscription | null = await Subscription.findByIdAndUpdate(new mongoose.Types.ObjectId(subscriptionId), bodyData);
            if (subscription) {
                return Promise.resolve(STATUS_MSG.SUCCESS.UPDATE_SUCCESS('Subscription updated '))
            }
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
    static async deleteSubscription(subscriptionId: any, bodyData: any): Promise<Object | void> {
        try {
            await deleteSubscription.validateAsync(bodyData);
            const delSubscription: ISubscription | null = await Subscription.findByIdAndDelete(new mongoose.Types.ObjectId(subscriptionId));
            if (deleteSubscription)
                return Promise.resolve(STATUS_MSG.SUCCESS.DELETED);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`SubscriptionId: ${subscriptionId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}