export interface ILocation {
    type: String,
    coordinates: [Number, Number]
}
export interface IAdmin {
    _id?: Object,
    name: String,
    email: String,
    gender: String,
    dob: Date,
    profilePicture?: [String],
    phoneNumber: String,
    password: String,
    location: ILocation,
    homeTown?: String,
    jobTitle?: String,
    isPhoneVerified?: Boolean,
    isMailVerified?: Boolean,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IEvent {
    _id?: Object,
    createdBy: Object,
    eventName: String,
    eventLocation: String,
    location: ILocation,
    eventDate: Date,
    eventDescription: String,
    eventStatus: String,
    totalTickets: Number,
    availableTickets: Number,
    bookedTickets: Number,
    ageBetween: [Number],
    freeDrinks: Number,
    price: Number,
    bookedBy?: [Object],
    eventImages?: [String],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IPayment {
    _id?: Object,
    userId: Object,
    amount: Number,
    payTax: Number,
    grandTotal: Number
    payStatus: String,
    payTransactionId: String,
    payDescription: String,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IReport {
    _id?: Object,
    reasons: String,
    otherReasons?: String,
    reportedBy: Object,
    reportedTo: Object,
    isApproved: Boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ISubscription {
    _id?: Object,
    subscriptionPlan: String,
    subscriptionMonths: Number,
    price: Number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUser {
    _id?: Object,
    name?: String,
    phoneNumber?: String,
    email?: String,
    gender?: String,
    dob?: Date,
    loginType?: String,
    facebookId?: String,
    profilePicture?: [String],
    bio?: [String],
    location?: ILocation,
    height?: [Number],
    zodiac?: String,
    interestedIn?: String,
    ageBetween?: [Number],
    homeTown?: String,
    jobTitle?: String,
    eduLevel?: String,
    religiousBelief?: String,
    politicalLeaning?: String,
    haveCigarette?: String,
    haveAlcohol?: String,
    haveMarijuana?: String,
    haveDrugs?: String,
    reportNum?: Number,
    isPhoneVerified?: Boolean,
    isMailVerified?: Boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserDetails {
    _id?: Object,
    blockedUsers?: [Object],
    reportedUsers?: [Object],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserEvent {
    _id: Object,
    eventBookingCode: string,
    eventId: Object,
    userId: Object,
    userInvite: Object,
    paymentId: Object,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserInvite {
    _id: Object,
    invitedBy: Object,
    invitedTo: Object,
    eventId: Object,
    inviteStatus: String,
    inviteType: String,
    isOfferingTicket: Boolean,
    isBookingDoneForReceiver: Boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserSubscription {
    _id: Object,
    subscriptionId: Object,
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    subscriptionStatus: String,
    userId: Object,
    paymentId: Object,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ISession {
    _id?: Object,
    userId: Object,
    userType: String,
    deviceToken: String,
    deviceId: String,
    isActive: Boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ISessionDeviceData {
    deviceId?: String,
    deviceToken?: String
}