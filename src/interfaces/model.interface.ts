export interface IAdmin {
    _id?: Object,
    name: String,
    email: String,
    gender: String,
    dob: Date,
    profilePicture?: [String],
    phoneNumber: String,
    password: String,
    geometry: Object,
    height?: [Number],
    zodiac?: String,
    homeTown?: String,
    jobTitle?: String,
    isPhoneVerified?: Boolean,
    isMailVerified?: Boolean,
    createdAt?: Date,
    updatedAt?: Date,
}
export interface IBooking {
    _id?: Object,
    bookingId: String,
    eventId: Object,
    bookedBy: Object,
    bookedFor: Object,
    paymentId: Object,
    bookingStatus: String,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ICard {
    _id?: Object,
    nameOnCard: String,
    cardNumber: Number,
    expDate: Date,
    cvv: Number,
    cardType: String,
    cardStatus: String,
    userId: Object,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IEvent {
    _id?: Object,
    createdBy: Object,
    eventName: String,
    geometry: Object,
    eventDate: Date,
    eventDescription: String,
    eventStatus: String,
    totalTickets: Number,
    availableTickets: Number,
    bookedTickets: Number,
    ageBetween: [Number],
    freeDrinks: Number,
    price: Number,
    bookedFor?: [Object],
    eventImages?: [String],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IPayment {
    _id?: Object,
    payId: String,
    nameOnCard: String,
    cardNumber: Number,
    expDate: Date,
    cvv: Number,
    payDate: Date,
    payBy: Object,
    amount: Number,
    payTax: Number,
    total: Number
    status: String,
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
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    price: Number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUser {
    _id?: Object,
    name?: String,
    phoneNumber?: String,
    email?: String,
    password?: String   //there is 
    gender?: String,
    dob?: Date,
    loginType?: String,
    facebookId?: String,
    profilePicture?: [String],
    bio?: [String],
    geometry?: Object,
    height?: [Number],
    zodiac?: String,
    interestedIn?: String,
    ageBetween?: [Number],
    homeTown?: String,
    jobTitle?: String,
    eduLevel?: String,
    religiousBelief?: String,
    politicalLeaning?: String,
    haveCigares?: String,
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
    reportUsers?: [Object],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserEvent {
    _id: Object,
    eventId: Object,
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
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserSubscription {
    _id: Object,
    subscriptionId: Object,
    userId: Object,
    paymentId: Object,
    createdAt?: Date,
    updatedAt?: Date
}