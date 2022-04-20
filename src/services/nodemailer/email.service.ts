import { SERVICES, CONFIG } from '../../constants'
import nodemailer from "nodemailer"
export async function sendEmail(email: String): Promise<any> {
    console.log(email);
    const tranporter = nodemailer.createTransport({
        name: "coach",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: SERVICES.EMAIL.MAIL,
            pass: SERVICES.EMAIL.MAIL_PASSWORD
        }
    });

    try {
        const info = await tranporter.sendMail({
            from: SERVICES.EMAIL.MAIL,
            to: <string>email,
            subject: "Verify your email",
            html: `<a href ="http://localhost:${CONFIG.PORT}/user/mail-verified/:userId"> Click here</a>`
        })
        console.log({ info });
        return info;
    } catch (err) {
        console.log({ err });
        return Promise.reject(err);

    }
}