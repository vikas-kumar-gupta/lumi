import { HydratedDocument } from 'mongoose'
import { STATUS_MSG } from '../../../constants';
import { ISubscription, IUserSubscription } from "../../../interfaces/model.interface";
import Subscription from '../../../models/admin/admin.subscription.model';
import UserSubscription from '../../../models/user/user_subscription.model';

export default class UserSubscriptionEntity {

    /**
     * @description creating a new userSubscription
     * @param options 
     * @returns 
     */
    static async newUserSubscription(options: Object): Promise<IUserSubscription> {
        try {
            const userSubscription: HydratedDocument<IUserSubscription> = new UserSubscription(options);
            await userSubscription.save();
            return Promise.resolve(userSubscription);
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async findSubscriptionById(subscriptionId: any): Promise<ISubscription> {
        try {
            const subscription: ISubscription | null = await Subscription.findById(subscriptionId)
            if (subscription)
                return Promise.resolve(subscription);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`SubscriptionId: ${subscriptionId}`))
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}