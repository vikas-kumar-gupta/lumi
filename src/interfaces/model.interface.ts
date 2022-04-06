export interface IUser {
    _id? : object,
    name: string,
    email: string,
    password: string,
    gender: string,
    dob: Date,
    mobileNumber: number,
    subscription: object,
    profilePicture: [string],
    bio: [string],
    geometry: object,               // location has to be modifeied
    height: [number],
    interestedIn: string,
    ageBetween: [number],
    homeTown: string,
    jobTitle: string,
    eduLevel: string,
    religiousBelief: string,
    politicalLeaning: string,
    haveCigares: string,
    haveAlcohol: string,
    haveMarijuana: string,
    haveDrugs: string,
    reportNum: number,
    isVerified: boolean,
    userDetails: object,
    createdAt? : Date,
    updatedAt? : Date
}

export interface IUserDetails {
    _id?: object,
    user: object,
    savedCards?: [object],
    myEvents?: [object],
    invitesSend?: [object],
    invitesReceive?: [object],
    blockedUsers?: [object],
    reportUsers?: [object],
    createdAt? : Date,
    updatedAt? : Date
}

export interface IEvent {
    _id?: object,
    bookingId: string,             // #987654
    eventName: string,
    geometry: object,        // location has to be modifeied
    eventDate: Date,
    eventDescription: string
    availableTicks: number,
    ageBetween: [number],
    attendeesNumber: number,
    freeDrinks: number,
    price: number,
    bookedBy?: [object],
    eventImages?: [string],
    attendees?: [object],
    createdAt? : Date,
    updatedAt? : Date
}

export interface IPayment {
    _id?: object,
    nameOnCard: string,
    cardNumber:number,
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