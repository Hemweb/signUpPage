const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            service: 'gmail',
            port: 587,
            secure: true,
            auth: {
                user: 'fromnodemail@gmail.com',
                pass: 'Hemwebmail',
            },
        });

        await transporter.sendMail({
            from: 'fromnodemail@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;