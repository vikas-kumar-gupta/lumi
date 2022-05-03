import { DBENUMS } from '../../constants'
import { Schema, model } from 'mongoose';
import { IUserInvite } from '../../interfaces/model.interface';

const userInviteSchema = new Schema<IUserInvite>(
    {
        invitedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        invitedTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        inviteStatus: {
            type: String,
            enum: DBENUMS.INVITE_STATUS,
            default: DBENUMS.INVITE_STATUS[0],
            required: true
        },
        inviteType: {
            type: String,
            enum: DBENUMS.INVITE_TYPE,
            required: true
        } ,
        isOfferingTicket: {
            type: Boolean,
            default: false,
            required: true
        },
        isBookingDoneForReceiver: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    {
        timestamps: true
    }
)

const UserInvite = model<IUserInvite>('User_Invite', userInviteSchema);

export default UserInvite;
