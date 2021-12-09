import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export const sendRegistrationEmail =async(recieverEmail)=> {
    try {
        const msg = {
            to: recieverEmail,
            from: process.env.SENDER_EMAIL, 
            subject: 'Sending with SendGrid is Fun',
            text: 'Whassssup bro? how u doin?',
            html: '<strong>Whassssup bro? how u doin?n</strong>',
        }
        await sgMail.send(msg)
        
    } catch (error) {
        console.log(error);
    }
}
  