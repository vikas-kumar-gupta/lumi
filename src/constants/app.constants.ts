export const ENVIRONMENT = {
    PRODUCTION: `production`,
    DEVELOPMENT: `development`,
    STAGING: `staging`,
    QA: `qa`,
    TESTING: `testing`,
    DEFAULT: `default`
}

export const DBENUMS = {
    ACCEPTANCE: ["YES", "NO", "SOMETIMES", "PREFER NOT TO SAY"],
    BOOKING_STATUS: ["BOOKED", "CANCELED"],
    CARD_TYPE: ["CREDIT CARD", "DEBIT CARD"],
    CARD_STATUS: ["ACTIVE", "INACTIVE", "EXPIRED"],
    EDU_LEVEL: ["HIGH SCHOOL", "UNDERGRADUATE", "POST GRADUATE", "PREFER NOT TO SAY"],
    EVENT_STATUS: ["UPCOMING", "ACTIVE", "EXPIRED", "DELETED", "CANCELED"],
    GENDER: ["MALE", "FEMALE", "NON-BINARY"],
    INTERESTS: ["MEN", "WOMEN", "MEN + WOMEN", "GENDER FLUID PEOPLE"],
    INVITE_STATUS: ["PENDING", "ACCEPTED", "DECLINE"],
    INVITE_TYPE: ["SENT", "RECEIVED"],
    LOGIN_TYPE: ["FACEBOOK", "PHONENUMBER"],
    POLITICAL_LEANING: ["LIBERAL", "MODERATE", "CONSERVATIVE", "OTHER", "PREFER NOT TO  SAY"],
    PAYMENT_STATUS: ["COMPLETE", "CANCELLED", "PENDING"],
    RELIGIOUS: ["BUDDHISM", "CHRISTIANITY", "JUDAISM", "ISLAM", "HINDUISM", "OTHER", "NONE", "PREFER NOT TO SAY"],
    REPORT_REASON: ["INAPPROPRIATE CONTENT", "HATE SPEECH OR VOILENCE", "I DONT WANT THEM TO SEE ME", "OTHER"],
    SIGNUPSOURCE: ["NORMAL", "APPLE", "GOOGLE", "FACEBOOK"],
    STATUS: ["ACTIVE", "INACTIVE", "DELETED"],
    SUBSCRIPTION_PLAN: ["SILVER", "GOLD", "PLATINUM"],
    SUBSCRIPTION_STATUS: ["ACTIVE", "EXPIRED"],
    ZODIAC: ["ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO", "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES"]
}

export let STATUS_MSG = {
    ERROR: {
        BAD_REQUEST: {
            statusCode: 400,
            success: false,
            message: "BAD REQUEST",
            type: "BAD_REQUEST"
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
            message: "Your session has expired. Please logout and login again.",
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
        UPDATED: {
            statusCode: 200,
            success: true,
            message: 'Updated Successfully',
            name: 'UPDATED'
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
        UPDATE_SUCCESS: (title: string) => {
            return {
                statusCode: 200,
                success: true,
                message: `${title} successfully`,
                type: 'UPDATE_SUCCESS'
            }
        },
        FETCH_SUCCESS: (msg: string, data?: any) => {
            return {
                statusCode: 200,
                success: true,
                message: msg,
                type: 'FETCH_SUCCESS',
                data: data
            }
        }
    },
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

// All countries
// length 252
export const COUNTRIES = {
    "AF": { "name": "Afghanistan", "phone": 93 },
    "AX": { "name": "Aland Islands", "phone": 358 },
    "AL": { "name": "Albania", "phone": 355 },
    "DZ": { "name": "Algeria", "phone": 213 },
    "AS": { "name": "American Samoa", "phone": 1684 },
    "AD": { "name": "Andorra", "phone": 376 },
    "AO": { "name": "Angola", "phone": 244 },
    "AI": { "name": "Anguilla", "phone": 1264 },
    "AQ": { "name": "Antarctica", "phone": 672 },
    "AG": { "name": "Antigua and Barbuda", "phone": 1268 },
    "AR": { "name": "Argentina", "phone": 54 },
    "AM": { "name": "Armenia", "phone": 374 },
    "AW": { "name": "Aruba", "phone": 297 },
    "AU": { "name": "Australia", "phone": 61 },
    "AT": { "name": "Austria", "phone": 43 },
    "AZ": { "name": "Azerbaijan", "phone": 994 },
    "BS": { "name": "Bahamas", "phone": 1242 },
    "BH": { "name": "Bahrain", "phone": 973 },
    "BD": { "name": "Bangladesh", "phone": 880 },
    "BB": { "name": "Barbados", "phone": 1246 },
    "BY": { "name": "Belarus", "phone": 375 },
    "BE": { "name": "Belgium", "phone": 32 },
    "BZ": { "name": "Belize", "phone": 501 },
    "BJ": { "name": "Benin", "phone": 229 },
    "BM": { "name": "Bermuda", "phone": 1441 },
    "BT": { "name": "Bhutan", "phone": 975 },
    "BO": { "name": "Bolivia", "phone": 591 },
    "BQ": { "name": "Bonaire, Sint Eustatius and Saba", "phone": 599 },
    "BA": { "name": "Bosnia and Herzegovina", "phone": 387 },
    "BW": { "name": "Botswana", "phone": 267 },
    "BV": { "name": "Bouvet Island", "phone": 55 },
    "BR": { "name": "Brazil", "phone": 55 },
    "IO": { "name": "British Indian Ocean Territory", "phone": 246 },
    "BN": { "name": "Brunei Darussalam", "phone": 673 },
    "BG": { "name": "Bulgaria", "phone": 359 },
    "BF": { "name": "Burkina Faso", "phone": 226 },
    "BI": { "name": "Burundi", "phone": 257 },
    "KH": { "name": "Cambodia", "phone": 855 },
    "CM": { "name": "Cameroon", "phone": 237 },
    "CA": { "name": "Canada", "phone": 1 },
    "CV": { "name": "Cape Verde", "phone": 238 },
    "KY": { "name": "Cayman Islands", "phone": 1345 },
    "CF": { "name": "Central African Republic", "phone": 236 },
    "TD": { "name": "Chad", "phone": 235 },
    "CL": { "name": "Chile", "phone": 56 },
    "CN": { "name": "China", "phone": 86 },
    "CX": { "name": "Christmas Island", "phone": 61 },
    "CC": { "name": "Cocos (Keeling) Islands", "phone": 672 },
    "CO": { "name": "Colombia", "phone": 57 },
    "KM": { "name": "Comoros", "phone": 269 },
    "CG": { "name": "Congo", "phone": 242 },
    "CD": { "name": "Congo, Democratic Republic of the Congo", "phone": 242 },
    "CK": { "name": "Cook Islands", "phone": 682 },
    "CR": { "name": "Costa Rica", "phone": 506 },
    "CI": { "name": "Cote D'Ivoire", "phone": 225 },
    "HR": { "name": "Croatia", "phone": 385 },
    "CU": { "name": "Cuba", "phone": 53 },
    "CW": { "name": "Curacao", "phone": 599 },
    "CY": { "name": "Cyprus", "phone": 357 },
    "CZ": { "name": "Czech Republic", "phone": 420 },
    "DK": { "name": "Denmark", "phone": 45 },
    "DJ": { "name": "Djibouti", "phone": 253 },
    "DM": { "name": "Dominica", "phone": 1767 },
    "DO": { "name": "Dominican Republic", "phone": 1809 },
    "EC": { "name": "Ecuador", "phone": 593 },
    "EG": { "name": "Egypt", "phone": 20 },
    "SV": { "name": "El Salvador", "phone": 503 },
    "GQ": { "name": "Equatorial Guinea", "phone": 240 },
    "ER": { "name": "Eritrea", "phone": 291 },
    "EE": { "name": "Estonia", "phone": 372 },
    "ET": { "name": "Ethiopia", "phone": 251 },
    "FK": { "name": "Falkland Islands (Malvinas)", "phone": 500 },
    "FO": { "name": "Faroe Islands", "phone": 298 },
    "FJ": { "name": "Fiji", "phone": 679 },
    "FI": { "name": "Finland", "phone": 358 },
    "FR": { "name": "France", "phone": 33 },
    "GF": { "name": "French Guiana", "phone": 594 },
    "PF": { "name": "French Polynesia", "phone": 689 },
    "TF": { "name": "French Southern Territories", "phone": 262 },
    "GA": { "name": "Gabon", "phone": 241 },
    "GM": { "name": "Gambia", "phone": 220 },
    "GE": { "name": "Georgia", "phone": 995 },
    "DE": { "name": "Germany", "phone": 49 },
    "GH": { "name": "Ghana", "phone": 233 },
    "GI": { "name": "Gibraltar", "phone": 350 },
    "GR": { "name": "Greece", "phone": 30 },
    "GL": { "name": "Greenland", "phone": 299 },
    "GD": { "name": "Grenada", "phone": 1473 },
    "GP": { "name": "Guadeloupe", "phone": 590 },
    "GU": { "name": "Guam", "phone": 1671 },
    "GT": { "name": "Guatemala", "phone": 502 },
    "GG": { "name": "Guernsey", "phone": 44 },
    "GN": { "name": "Guinea", "phone": 224 },
    "GW": { "name": "Guinea-Bissau", "phone": 245 },
    "GY": { "name": "Guyana", "phone": 592 },
    "HT": { "name": "Haiti", "phone": 509 },
    "HM": { "name": "Heard Island and Mcdonald Islands", "phone": 0 },
    "VA": { "name": "Holy See (Vatican City State)", "phone": 39 },
    "HN": { "name": "Honduras", "phone": 504 },
    "HK": { "name": "Hong Kong", "phone": 852 },
    "HU": { "name": "Hungary", "phone": 36 },
    "IS": { "name": "Iceland", "phone": 354 },
    "IN": { "name": "India", "phone": 91 },
    "ID": { "name": "Indonesia", "phone": 62 },
    "IR": { "name": "Iran, Islamic Republic of", "phone": 98 },
    "IQ": { "name": "Iraq", "phone": 964 },
    "IE": { "name": "Ireland", "phone": 353 },
    "IM": { "name": "Isle of Man", "phone": 44 },
    "IL": { "name": "Israel", "phone": 972 },
    "IT": { "name": "Italy", "phone": 39 },
    "JM": { "name": "Jamaica", "phone": 1876 },
    "JP": { "name": "Japan", "phone": 81 },
    "JE": { "name": "Jersey", "phone": 44 },
    "JO": { "name": "Jordan", "phone": 962 },
    "KZ": { "name": "Kazakhstan", "phone": 7 },
    "KE": { "name": "Kenya", "phone": 254 },
    "KI": { "name": "Kiribati", "phone": 686 },
    "KP": { "name": "Korea, Democratic People's Republic of", "phone": 850 },
    "KR": { "name": "Korea, Republic of", "phone": 82 },
    "XK": { "name": "Kosovo", "phone": 381 },
    "KW": { "name": "Kuwait", "phone": 965 },
    "KG": { "name": "Kyrgyzstan", "phone": 996 },
    "LA": { "name": "Lao People's Democratic Republic", "phone": 856 },
    "LV": { "name": "Latvia", "phone": 371 },
    "LB": { "name": "Lebanon", "phone": 961 },
    "LS": { "name": "Lesotho", "phone": 266 },
    "LR": { "name": "Liberia", "phone": 231 },
    "LY": { "name": "Libyan Arab Jamahiriya", "phone": 218 },
    "LI": { "name": "Liechtenstein", "phone": 423 },
    "LT": { "name": "Lithuania", "phone": 370 },
    "LU": { "name": "Luxembourg", "phone": 352 },
    "MO": { "name": "Macao", "phone": 853 },
    "MK": { "name": "Macedonia, the Former Yugoslav Republic of", "phone": 389 },
    "MG": { "name": "Madagascar", "phone": 261 },
    "MW": { "name": "Malawi", "phone": 265 },
    "MY": { "name": "Malaysia", "phone": 60 },
    "MV": { "name": "Maldives", "phone": 960 },
    "ML": { "name": "Mali", "phone": 223 },
    "MT": { "name": "Malta", "phone": 356 },
    "MH": { "name": "Marshall Islands", "phone": 692 },
    "MQ": { "name": "Martinique", "phone": 596 },
    "MR": { "name": "Mauritania", "phone": 222 },
    "MU": { "name": "Mauritius", "phone": 230 },
    "YT": { "name": "Mayotte", "phone": 269 },
    "MX": { "name": "Mexico", "phone": 52 },
    "FM": { "name": "Micronesia, Federated States of", "phone": 691 },
    "MD": { "name": "Moldova, Republic of", "phone": 373 },
    "MC": { "name": "Monaco", "phone": 377 },
    "MN": { "name": "Mongolia", "phone": 976 },
    "ME": { "name": "Montenegro", "phone": 382 },
    "MS": { "name": "Montserrat", "phone": 1664 },
    "MA": { "name": "Morocco", "phone": 212 },
    "MZ": { "name": "Mozambique", "phone": 258 },
    "MM": { "name": "Myanmar", "phone": 95 },
    "NA": { "name": "Namibia", "phone": 264 },
    "NR": { "name": "Nauru", "phone": 674 },
    "NP": { "name": "Nepal", "phone": 977 },
    "NL": { "name": "Netherlands", "phone": 31 },
    "AN": { "name": "Netherlands Antilles", "phone": 599 },
    "NC": { "name": "New Caledonia", "phone": 687 },
    "NZ": { "name": "New Zealand", "phone": 64 },
    "NI": { "name": "Nicaragua", "phone": 505 },
    "NE": { "name": "Niger", "phone": 227 },
    "NG": { "name": "Nigeria", "phone": 234 },
    "NU": { "name": "Niue", "phone": 683 },
    "NF": { "name": "Norfolk Island", "phone": 672 },
    "MP": { "name": "Northern Mariana Islands", "phone": 1670 },
    "NO": { "name": "Norway", "phone": 47 },
    "OM": { "name": "Oman", "phone": 968 },
    "PK": { "name": "Pakistan", "phone": 92 },
    "PW": { "name": "Palau", "phone": 680 },
    "PS": { "name": "Palestinian Territory, Occupied", "phone": 970 },
    "PA": { "name": "Panama", "phone": 507 },
    "PG": { "name": "Papua New Guinea", "phone": 675 },
    "PY": { "name": "Paraguay", "phone": 595 },
    "PE": { "name": "Peru", "phone": 51 },
    "PH": { "name": "Philippines", "phone": 63 },
    "PN": { "name": "Pitcairn", "phone": 64 },
    "PL": { "name": "Poland", "phone": 48 },
    "PT": { "name": "Portugal", "phone": 351 },
    "PR": { "name": "Puerto Rico", "phone": 1787 },
    "QA": { "name": "Qatar", "phone": 974 },
    "RE": { "name": "Reunion", "phone": 262 },
    "RO": { "name": "Romania", "phone": 40 },
    "RU": { "name": "Russian Federation", "phone": 70 },
    "RW": { "name": "Rwanda", "phone": 250 },
    "BL": { "name": "Saint Barthelemy", "phone": 590 },
    "SH": { "name": "Saint Helena", "phone": 290 },
    "KN": { "name": "Saint Kitts and Nevis", "phone": 1869 },
    "LC": { "name": "Saint Lucia", "phone": 1758 },
    "MF": { "name": "Saint Martin", "phone": 590 },
    "PM": { "name": "Saint Pierre and Miquelon", "phone": 508 },
    "VC": { "name": "Saint Vincent and the Grenadines", "phone": 1784 },
    "WS": { "name": "Samoa", "phone": 684 },
    "SM": { "name": "San Marino", "phone": 378 },
    "ST": { "name": "Sao Tome and Principe", "phone": 239 },
    "SA": { "name": "Saudi Arabia", "phone": 966 },
    "SN": { "name": "Senegal", "phone": 221 },
    "RS": { "name": "Serbia", "phone": 381 },
    "CS": { "name": "Serbia and Montenegro", "phone": 381 },
    "SC": { "name": "Seychelles", "phone": 248 },
    "SL": { "name": "Sierra Leone", "phone": 232 },
    "SG": { "name": "Singapore", "phone": 65 },
    "SX": { "name": "Sint Maarten", "phone": 1 },
    "SK": { "name": "Slovakia", "phone": 421 },
    "SI": { "name": "Slovenia", "phone": 386 },
    "SB": { "name": "Solomon Islands", "phone": 677 },
    "SO": { "name": "Somalia", "phone": 252 },
    "ZA": { "name": "South Africa", "phone": 27 },
    "GS": { "name": "South Georgia and the South Sandwich Islands", "phone": 500 },
    "SS": { "name": "South Sudan", "phone": 211 },
    "ES": { "name": "Spain", "phone": 34 },
    "LK": { "name": "Sri Lanka", "phone": 94 },
    "SD": { "name": "Sudan", "phone": 249 },
    "SR": { "name": "Suriname", "phone": 597 },
    "SJ": { "name": "Svalbard and Jan Mayen", "phone": 47 },
    "SZ": { "name": "Swaziland", "phone": 268 },
    "SE": { "name": "Sweden", "phone": 46 },
    "CH": { "name": "Switzerland", "phone": 41 },
    "SY": { "name": "Syrian Arab Republic", "phone": 963 },
    "TW": { "name": "Taiwan, Province of China", "phone": 886 },
    "TJ": { "name": "Tajikistan", "phone": 992 },
    "TZ": { "name": "Tanzania, United Republic of", "phone": 255 },
    "TH": { "name": "Thailand", "phone": 66 },
    "TL": { "name": "Timor-Leste", "phone": 670 },
    "TG": { "name": "Togo", "phone": 228 },
    "TK": { "name": "Tokelau", "phone": 690 },
    "TO": { "name": "Tonga", "phone": 676 },
    "TT": { "name": "Trinidad and Tobago", "phone": 1868 },
    "TN": { "name": "Tunisia", "phone": 216 },
    "TR": { "name": "Turkey", "phone": 90 },
    "TM": { "name": "Turkmenistan", "phone": 7370 },
    "TC": { "name": "Turks and Caicos Islands", "phone": 1649 },
    "TV": { "name": "Tuvalu", "phone": 688 },
    "UG": { "name": "Uganda", "phone": 256 },
    "UA": { "name": "Ukraine", "phone": 380 },
    "AE": { "name": "United Arab Emirates", "phone": 971 },
    "GB": { "name": "United Kingdom", "phone": 44 },
    "US": { "name": "United States", "phone": 1 },
    "UM": { "name": "United States Minor Outlying Islands", "phone": 1 },
    "UY": { "name": "Uruguay", "phone": 598 },
    "UZ": { "name": "Uzbekistan", "phone": 998 },
    "VU": { "name": "Vanuatu", "phone": 678 },
    "VE": { "name": "Venezuela", "phone": 58 },
    "VN": { "name": "Viet Nam", "phone": 84 },
    "VG": { "name": "Virgin Islands, British", "phone": 1284 },
    "VI": { "name": "Virgin Islands, U.s.", "phone": 1340 },
    "WF": { "name": "Wallis and Futuna", "phone": 681 },
    "EH": { "name": "Western Sahara", "phone": 212 },
    "YE": { "name": "Yemen", "phone": 967 },
    "ZM": { "name": "Zambia", "phone": 260 },
    "ZW": { "name": "Zimbabwe", "phone": 263 }
};