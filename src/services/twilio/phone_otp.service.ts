import { STATUS_MSG } from '../../constants'
import { SERVICES } from '../../constants'
import { Twilio } from 'twilio'


const client = new Twilio(SERVICES.TWILIO.ACCOUNT_SID, SERVICES.TWILIO.AUTH_TOKEN)


export default class TwilioPhoneOTP {

    /**
     * @description to get the otp on mobile number
     * @params phoneNumber in string with country code eg. "+919876543210"
     */
    static async getOTP(phoneNumber: string): Promise<void> {
        try {
            client.verify
                .services(SERVICES.TWILIO.SERVICE_ID)
                .verifications.create({ to: phoneNumber, channel: "sms" })
                .then((data: any) => data)
                .catch((err: any) => new Error(err))
        }
        catch (err: any) {
            return Promise.reject(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while generating otp'))
        }
    }


    static async verifyOtp(phoneNumber: string, otp: string): Promise<void> {
        try {
            let otpData: any;
            client.verify
                .services(SERVICES.TWILIO.SERVICE_ID)
                .verificationChecks.create({ to: phoneNumber, code: otp })
                .then((data: any) => {
                    otpData = data;
                    console.log(data);
                })
                .catch((err: any) => console.log(`--------------\n${err}`));
            return otpData;
        }
        catch (err: any) {
            return Promise.reject(STATUS_MSG.ERROR.DEFAULT_ERROR_MESSAGE('Error while verifying otp'))
        }
    }
}