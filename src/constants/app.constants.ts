export const ENVIRONMENT = {
    PRODUCTION: `production`,
    DEVELOPMENT: `development`,
    STAGING: `staging`,
    QA: `qa`,
    TESTING: `testing`,
    DEFAULT: `default`
}

export const DBENUMS = {
    PAYMENT_FOR: ['Event', 'Subscription'],
    ACCEPTANCE: ["Yes", "No", "Sometimes", "Prefer not to say"],
    EDU_LEVEL: ["High School", "Undergraduate", "Post Graduate", "Prefer not to say"],
    INTERESTS: ["Men", "Women", "Men + Women", "Gender Fluid People"],
    POLITICAL_LEANING: ["Liberal", "Moderate", "Conservative", "Other", "Prefer not to say"],
    RELIGIOUS: ["Buddhism", "Christianity", "Judaism", "Islam", "Hinduism", "Other", "None", "Prefer not to say"],
    REPORT_REASON: ["Inappropriate Content", "Hate speech or voilence", "I don't want them to see me", "Others"],
    SUBSCRIPTION_PLAN: ["Silver", "Gold", "Platinum"],
    USER_TYPE: ["Admin", "User"],
    ZODIAC: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
    BOOKING_STATUS: ["BOOKED", "CANCELED"],
    CARD_TYPE: ["CREDIT CARD", "DEBIT CARD"],
    CARD_STATUS: ["ACTIVE", "INACTIVE", "EXPIRED"],
    EVENT_STATUS: ["UPCOMING", "ACTIVE", "EXPIRED", "DELETED", "CANCELED"],
    GENDER: ["Male", "Female", "Non-Binary"],
    INVITE_STATUS: ["PENDING", "ACCEPTED", "DECLINE"],
    INVITE_TYPE: ["SENT", "RECEIVED"],
    LOGIN_TYPE: ["FACEBOOK", "PHONENUMBER"],
    PAYMENT_STATUS: ["COMPLETE", "CANCELLED", "PENDING"],
    SIGNUPSOURCE: ["NORMAL", "APPLE", "GOOGLE", "FACEBOOK"],
    STATUS: ["ACTIVE", "INACTIVE", "DELETED"],
    SUBSCRIPTION_STATUS: ["Active", "Expired"],
}

export let STATUS_MSG = {
    ERROR: {
        BAD_REQUEST: {
            statusCode: 400,
            success: false,
            message: "BAD REQUEST",
            type: "BAD_REQUEST"
        },
        TICKET_NOT_AVAILABLE: {
            statusCode: 400,
            success: false,
            message: "Ticken is not available",
            type: "TICKEN_NOT_AVAILABLE"
        },
        PAGINATION: {
            statusCode: 400,
            success: false,
            message: "Page value can not be less than zero",
            type: "BAD_REQUEST"
        },
        HEADER_MISSING: {
            statusCode: 400,
            success: false,
            message: "Token missing",
            type: "BAD_REQUEST"
        },
        PASSWORD_NOT_MATCHED: {
            statusCode: 400,
            success: false,
            type: "PASSWORD_NOT_MATCHED",
            message: "Password does not match with confirm password"
        },
        INVALID_OTP: {
            statusCode: 400,
            success: false,
            message: "Invalid OTP",
            type: "INVALID_OTP"
        },

        INCORRECT_CREDENTIALS: {
            statusCode: 400,
            success: false,
            message: "Incorrect credentials. Please try again",
            type: "INCORRECT_CREDENTIALS"
        },
        BLOCKED_ACCOUNT: {
            statusCode: 403,
            success: false,
            name: "INVALID_ACCOUNT",
            message: "Your account has been temporarly blocked"
        },
        INVALID_CREDENTIALS: {
            statusCode: 400,
            success: false,
            type: "INVALID_PASSWORD",
            message: "The email or password you entered is incorrect."
        },
        PAGE_NOT_FOUND: {
            statusCode: 400,
            success: false,
            type: "PAGE_NOT_FOUND",
            message: "Page not found!"
        },

        TOKEN_EXPIRED: {
            statusCode: 408,
            success: false,
            message: "Token expired or not provided",
            type: "TOKEN_ALREADY_EXPIRED"
        },
        TOKEN_ALREADY_EXIST: {
            statusCode: 400,
            success: false,
            type: "TOKEN_ALREADY_EXIST",
            message: "Your session has already logged in"
        },
        DB_ERROR: {
            statusCode: 400,
            success: false,
            message: 'DB Error : ',
            type: 'DB_ERROR'
        },
        INVALID_TOKEN: {
            statusCode: 401,
            success: false,
            message: 'Invalid token provided',
            type: 'INVALID_TOKEN'
        },

        SESSION_EXPIRED: {
            statusCode: 400,
            success: false,
            message: 'Session expired, please log in again',
            type: 'SESSION_EXPIRED'
        },

        UNAUTHORIZED: {
            statusCode: 401,
            success: false,
            message: 'You are not authorized to perform this action',
            type: 'UNAUTHORIZED'
        },

        UNAUTHORIZED_ADMIN: {
            statusCode: 408,
            success: false,
            message: 'Session Expired',
            type: 'UNAUTHORIZED'
        },
        MISSINING_AUTHENTICATION: (tokenType: any) => {
            return {
                statusCode: 401,
                success: false,
                message: 'Missing authentication ' + tokenType,
                type: 'MISSINING_AUTHENTICATION'
            }
        },
        INVALID_API_KEY: () => {
            return {
                statusCode: 401,
                success: false,
                message: 'Inavlid Api Key',
                type: 'MISSINING_AUTHENTICATION'
            }
        },
        IMP_ERROR: {
            statusCode: 500,
            success: false,
            message: 'Implementation Error',
            type: 'IMP_ERROR'
        },
        NOT_EXIST: (title: string) => {
            return {
                statusCode: 400,
                success: false,
                message: `${title} does not exist!`,
                type: 'BAD_REQUEST'
            }
        },
        ALREADY_EXIST: (title: String) => {
            return {
                statusCode: 400,
                success: false,
                message: `${title} already exists`,
                type: 'ALREADY_EXIST'
            }
        },
        ACTION_NOT_ALLOWED: {
            statusCode: 406,
            success: false,
            message: 'Action not allowed.',
            type: 'ACTION_NOT_ALLOWED'
        },
        DEFAULT_ERROR_MESSAGE: (message: string) => {
            return {
                statusCode: 406,
                success: false,
                message: message,
                type: 'DEFAULT_ERROR_MESSAGE'
            }
        }
    },

    SUCCESS: {
        DEFAULT: {
            statusCode: 200,
            success: true,
            message: 'Success',
            name: 'DEFAULT'
        },
        CREATED: {
            statusCode: 200,
            success: true,
            message: 'Created Successfully',
            type: 'CREATED'
        },
        PROFILE_UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Profile updated Successfully',
            type: 'CREATED'
        },
        REPORTED: {
            statusCode: 200,
            success: true,
            message: 'Profile reported Successfully',
            type: 'REPORTED'
        },
        BOOKED: {
            statusCode: 200,
            success: true,
            message: 'Event booked',
            type: 'BLOCKED'
        },
        SUBSCRIBED: {
            statusCode: 200,
            success: true,
            message: 'Subscribed successfuly',
            type: 'SUBSCRIBED'
        },
        BLOCKED: {
            statusCode: 200,
            success: true,
            message: 'Profile blocked Successfully',
            type: 'BLOCKED'
        },
        UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Updated Successfully',
            name: 'UPDATED'
        },
        VERIFIED: {
            statusCode: 200,
            success: true,
            message: 'Verified Successfully',
            name: 'VERIFIED'
        },
        INVITE_ACCEPTED: {
            statusCode: 200,
            success: true,
            message: 'Invitation accepted',
            name: 'INVITE_ACCEPTED'
        },
        INVITE_DECLINE: {
            statusCode: 200,
            success: true,
            message: 'Invitation decline',
            name: 'INVITE_DECLINE'
        },
        LOGOUT: {
            statusCode: 200,
            success: true,
            message: 'Logged Out Successfully',
            type: 'LOGOUT'
        },
        OTPSENT: {
            statusCode: 200,
            success: true,
            message: 'Otp sent successfully',
            type: 'OTP SENT'
        },
        MAIL_SENT: {
            statusCode: 250,
            success: true,
            message: 'Verification mail sent successfully',
            type: 'MAIL_SENT'
        },
        LOGIN: {
            statusCode: 200,
            success: true,
            message: 'Log In Successful',
            type: 'LOGIN'
        },
        DELETED: {
            statusCode: 200,
            success: true,
            message: 'Deleted Successfully',
            type: 'DELETED'
        },
        EMPTY_RECORD: {
            statusCode: 200,
            success: true,
            message: 'No record found.',
            type: 'DEFAULT'
        },
        PAYMENT_COMPLETE: {
            statusCode: 200,
            success: true,
            message: 'Payment successfully completed.',
            type: 'PAYMENT_COMPLETED'
        },
        UPDATE_SUCCESS: (title: string) => {
            return {
                statusCode: 200,
                success: true,
                message: `${title} updated successfully`,
                type: 'UPDATE_SUCCESS'
            }
        },
        FETCH_SUCCESS: (msg: string) => {
            return {
                statusCode: 200,
                success: true,
                message: `${msg} fetch success`,
                type: 'FETCH_SUCCESS',
            }
        }
    },
}

export const EXCLUDE_DATA = {
    MONGO: {
        // _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
    },
    EVENT: {
        createdBy: 0,
        bookedBy: 0
    },
    USER_PROFILE: {
        reportNum: 0,
        loginType: 0
    }
}

export const DATE = {
    TIMESTAMP: {
        CREATED_AT: () => {
            return Math.floor(Date.now() / 1000)
        },
        UPDARED_AT: () => {
            return Math.floor(Date.now() / 1000)
        }
    }
}