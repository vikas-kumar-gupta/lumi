export interface IUser {
    _id?: object,
    name?: string,
    phoneNumber?: string,
    email?: string,
    password?: String   //there is 
    gender?: string,
    dob?: Date,
    subscription?: object,
    profilePicture?: [string],
    bio?: [string],
    geometry?: object,               // location has to be modifeied
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
    matches: [object],
    savedCards?: [object],
    myEvents?: [object],
    invitesSend?: [object],
    invitesReceive?: [object],
    blockedUsers?: [object],
    reportUsers?: [object],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IEvent {
    _id?: object,
    createdBy: object,
    eventName: string,
    geometry: object,        // location has to be modifeied
    eventDate: Date,
    eventDescription: string,
    totalTickets: number,
    availableTickets: number,
    bookedTickets: number,
    ageBetween: [number],
    freeDrinks: number,
    price: number,
    bookedBy?: [object],
    eventImages?: [string],
    createdAt?: Date,
    updatedAt?: Date
}

export interface IPayment {
    _id?: object,
    nameOnCard: string,
    cardNumber: number,
    expDate: Date,
    cvv: number,
    payDate: Date,
    payBy: object,
    payTo: object,
    amount: number,
    payTax: number,
    total: number
    status: string,
    payId: string,
    createdAt: Date,
    updatedAt: Date
}

export interface ISubscription {
    _id?: object,
    subscriptionPlan: string,
    subscriptionMonths: number,
    subscriptionStartDate: Date,
    subscriptionEndDate: Date,
    price: number,
    paymentId: object,
    createdAt: Date,
    updatedAt: Date
}

export interface IReport {
    _id?: object,
    reasons: string,
    otherReasons?: string,
    reportedBy: object,
    reportedTo: object,
    isApproved: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface ICard {
    _id?: object,
    nameOnCard: string,
    cardNumber: number,
    expDate: Date,
    cvv: number,
    cardType: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IInvite {
    _id?: object,
    invitedBy: object,
    invitedTo: object,
    eventDetails: object,
    inviteStatus: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IBooking {
    _id?: object,
    bookingId: string,
    eventDetails: object,
    bookedBy: object,
    bookedFor: object,
    paymentDetails: object,
    bookingStatus: string,
    createdAt?: Date,
    updatedAt?: Date
}
