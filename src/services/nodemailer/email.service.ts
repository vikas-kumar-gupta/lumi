import { SERVICES, CONFIG, STATUS_MSG } from '../../constants'
import nodemailer from "nodemailer"

export async function sendEmail(email: String, token: any): Promise<any> {
    const tranporter = nodemailer.createTransport({
        name: "Lumi",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: SERVICES.EMAIL.MAIL,
            pass: SERVICES.EMAIL.MAIL_PASSWORD
        }
    });

    try {
        const data = await tranporter.sendMail({
            from: SERVICES.EMAIL.MAIL,
            to: <string>email,
            subject: "Verify your email",
            html: `<a href ="http://${CONFIG.HOST}:${CONFIG.PORT}/user/verify-email/${token}"> Click here to verify</a>`
        })
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
}