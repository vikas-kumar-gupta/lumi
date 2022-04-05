import mongoose, { Schema, model } from "mongoose";

export interface IUser {
    _id? : object,
    name: string,
    email: string,
    password: string,
    gender: string,
    dob: Date,
    mobileNumber: number,
    profilePicture: [string],
    isVerified: boolean,
    createdAt? : Date,
    updatedAt? : Date
}

export interface IUserDetails {
    _id?: object,
    user: object,
    subscription: object,
    bio: [string],
    geometry: object                // location has to be modifeied
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
    myEvents?: [object],
    invitesSend?: [object],
    invitesReceive?: [object],
    savedCards?: [object],
    blockedUsers?: [object],
    reportUsers?: [object],
    reportNum: number,
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
    attendees?: [object]
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
    createdAt: Date,
    amount: number,
    payTax: number,
    total: number
    status: string
}

export interface ISubscription {
    _id?: object,
    subType: string,
    subMonths: number,
    subStartDate: Date,
    subEndDate: Date,
    price: number,
    paymentId: object
}

export interface IReport {
    _id?: object,
    reasons: string,
    otherReasons?: string,
    reportedBy: object,
    reportedTo: object
}

export interface ICard {
    _id?: object,
    nameOnCard: string,
    cardNumber: number,
    expDate: Date,
    cvv: number,
    cardType: string
}