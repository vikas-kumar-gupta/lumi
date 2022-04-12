export interface IBooking {
    _id?: object,
    bookingId: String,
    eventId: object,
    bookedBy: object,
    bookedFor: object,
    paymentId: object,
    bookingStatus: String,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ICard {
    _id?: object,
    nameOnCard: string,
    cardNumber: number,
    expDate: Date,
    cvv: number,
    cardType: string,
    cardStatus: string,
    userId: object,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IEvent {
    _id?: object,
    createdBy: object,
    eventName: string,
    geometry: object,
    eventDate: Date,
    eventDescription: string,
    eventStatus: string,
    totalTickets: number,
    availableTickets: number,
    bookedTickets: number,
    ageBetween: [number],
    freeDrinks: number,
    price: number,
    bookedFor?: [object],
    eventImages?: [string],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IPayment {
    _id?: object,
    payId: string,
    nameOnCard: string,
    cardNumber: number,
    expDate: Date,
    cvv: number,
    payDate: Date,
    payBy: object,
    amount: number,
    payTax: number,
    total: number
    status: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IReport {
    _id?: object,
    reasons: string,
    otherReasons?: string,
    reportedBy: object,
    reportedTo: object,
    isApproved: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ISubscription {
    _id?: object,
    subscriptionPlan: string,
    subscriptionMonths: number,
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    price: number,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUser {
    _id?: object,
    name?: string,
    phoneNumber?: string,
    email?: string,
    password?: String   //there is 
    gender?: string,
    dob?: Date,
    loginType?: string,
    facebookId?: string,
    profilePicture?: [string],
    bio?: [string],
    geometry?: object,
    height?: [number],
    zodiac?: String,
    interestedIn?: string,
    ageBetween?: [number],
    homeTown?: string,
    jobTitle?: string,
    eduLevel?: string,
    religiousBelief?: string,
    politicalLeaning?: string,
    haveCigares?: string,
    haveAlcohol?: string,
    haveMarijuana?: string,
    haveDrugs?: string,
    reportNum?: number,
    isPhoneVerified?: boolean,
    isMailVerified?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserDetails {
    _id?: object,
    blockedUsers?: [object],
    reportUsers?: [object],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserEvent {
    _id: object,
    eventId: object,
    userInvite: object,
    paymentId: object,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserInvite {
    _id: object,
    invitedBy: object,
    invitedTo: object,
    eventId: object,
    inviteStatus: String,
    inviteType: String,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserSubscription {
    _id: object,
    subscriptionId: object,
    userId: object,
    paymentId: object,
    createdAt?: Date,
    updatedAt?: Date
}