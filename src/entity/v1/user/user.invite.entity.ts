import mongoose, { HydratedDocument } from 'mongoose';
import { EXCLUDE_DATA, STATUS_MSG } from '../../../constants';
import UserInvite from '../../../models/user/user_invites.model';
import { IUserInvite } from './../../../interfaces/model.interface';
export default class UserInviteEntity {

    /**
     * @description creating a new UserInvite
     * @param options 
     * @returns IUserInvite
     */
    static async newUserInvite(options: Object): Promise<IUserInvite> {
        try {
            const userInvite: HydratedDocument<IUserInvite> = new UserInvite(options);
            await userInvite.save();
            return Promise.resolve(userInvite);
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description find a userInvite using userInviteId
     * @param userInviteId 
     * @returns IUserInvite
     */
    static async findUserInviteById(userInviteId: any): Promise<IUserInvite> {
        try {
            const userInvite: IUserInvite | null = await UserInvite.findById(userInviteId);
            if (userInvite)
                return Promise.resolve(userInvite);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserInviteId: ${userInviteId}`));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * @description finding an userInvitation (sent/received)
     * @param filter 
     * @returns IUserInvite
     */
    static async findUserInvites(filter: Object): Promise<IUserInvite[]> {
        try {
            const userInvites: IUserInvite[] = await UserInvite.find(filter)
                .populate([
                    {
                        path: 'eventId invitedTo invitedBy',
                        select: 'eventDate eventName name'
                    },
                ])
                .select({ ...EXCLUDE_DATA.MONGO });
            return Promise.resolve(userInvites);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * @description update existing userInvite using userInviteId and update object
     * @param userInviteId 
     * @param update 
     * @returns IUserInvite
     */
    static async updateUserInviteById(userInviteId: any, update: Object): Promise<IUserInvite> {
        try {
            const userInvite: IUserInvite | null = await UserInvite.findByIdAndUpdate(userInviteId, update, { new: true })
                .select({ ...EXCLUDE_DATA.MONGO })
            if (userInvite)
                return Promise.resolve(userInvite);
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserInviteId: ${userInviteId}`));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
}