import { IReport, IUser, IUserDetails } from './../../../interfaces/model.interface';
import { STATUS_MSG, DBENUMS, EXCLUDE_DATA } from "../../../constants"
import User from '../../../models/user.model';
import Report from '../../../models/report.model';
import mongoose, { HydratedDocument } from 'mongoose'
import UserDetails from '../../../models/userDetails.model';

export default class UserMatchEntity {
    static async mayBeMatches(userId: any, userLocation: any): Promise<IUser[]> {
        /**
         ** IMP FACTOR TO BE MEASURE
         * ! Blocked and account should not show        done
         * ! user own account should not display        done
         * gender                                       done
         * age                                          
         * location                                     partially done
         * education level                              done  
         * religious                                    done
         * drugs, alcohol, marijauna, cigarette         done
         * height                                       not to consider
         */
        try {
            const user: IUser | null = await User.findById(userId);
            const userDetails: IUserDetails | null = await UserDetails.findById(userId);
            if (user && userDetails) {
                const options = {
                    //  for near by location of 50 miles
                    location: {
                        $geoWithin: {
                            $centerSphere: [[userLocation.coordinates[0], userLocation.coordinates[1]], 15 / 3963.2]
                        }
                    },
                    //  for not displaying own data and blocked users
                    _id: { $nin: [user._id, ...(userDetails.blockedUsers || [])] },
                    //  person adjustable factors for match
                    $or: [{ religiousBelief: user.religiousBelief }, { haveAlcohol: user.haveAlcohol }, { haveCigarette: user.haveCigarette }],
                    //  not adjustable factors for match there for it should be same for both profile
                    $and: [{ haveDrugs: user.haveDrugs }, { haveMarijuana: user.haveMarijuana }]
                }
                switch (user.interestedIn) {
                    case "Men + Women":
                    case "Gender Fluid People": {
                        const matches: IUser[] | null = await User.find({ ...options, gender: { $in: ["Male", "Female"] } })
                            .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE })
                        return Promise.resolve(matches)
                    }
                    default: {
                        const matches: IUser[] | null = await User.find({ ...options, gender: user.interestedIn })
                            .select({ ...EXCLUDE_DATA.MONGO, ...EXCLUDE_DATA.USER_PROFILE })
                        return Promise.resolve(matches)
                    }
                }
            }
            return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${userId}`));
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async reportProfile(options: Object, reportedBy: any, reportedTo: any): Promise<IReport> {
        try {
            // creating new report for the user
            const report: HydratedDocument<IReport> = new Report(options);
            await report.save()

            // pushing reported account in the users details model
            await UserDetails.findByIdAndUpdate(reportedBy, { $push: { reportedUsers: reportedTo } })
            return Promise.resolve(report)
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    static async blockProfile(userId: any, blockUserId: any): Promise<Object> {
        try {
            const user: IUser | null = await User.findById(new mongoose.Types.ObjectId(blockUserId));
            if (user) {
                await UserDetails.findByIdAndUpdate(userId, { $push: { blockedUsers: blockUserId } });
                return Promise.resolve(STATUS_MSG.SUCCESS.BLOCKED)
            }
            else {
                return Promise.reject(STATUS_MSG.ERROR.NOT_EXIST(`UserId: ${userId}`));
            }
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}