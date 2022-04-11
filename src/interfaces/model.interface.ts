export interface IUser {
    _id?: object,
    name?: string,
    email?: string,
    // password: string,
    gender?: string,
    dob?: Date,
    phoneNumber?: string,
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
    // userDetails: object,
    createdAt?: Date,
    updatedAt?: Date
}

export interface IUserDetails {
    _id?: object,
    // user: object,
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
    // attendees?: [object],
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
}

export interface ISubscription {
    _id?: object,
    subType: string,
    subMonths: number,
    subStartDate: Date,
    subEndDate: Date,
    price: number,
    paymentId: object,
    createdAt: Date
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
    createdAt: Date
}