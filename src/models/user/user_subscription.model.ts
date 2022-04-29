import { DBENUMS } from '../../constants'
import mongoose, { Schema, model} from 'mongoose';
import { IUserSubscription } from '../../interfaces/model.interface';

const userSubscriptionSchema = new Schema<IUserSubscription>(
    {
        subscriptionId: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
            required: true
        },
        subscriptionStartDate: {
            type: Date,
            required: true
        },
        subscriptionEndDate: {
            type: Date,
            required: true
        },
        subscriptionStatus: {
            type: String,
            enum: DBENUMS.SUBSCRIPTION_STATUS,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        paymentId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Payment'
        },
    },
    {
        timestamps: true
    }
)

const UserSubscription = model<IUserSubscription>('User_Subscription', userSubscriptionSchema);

export default UserSubscription;