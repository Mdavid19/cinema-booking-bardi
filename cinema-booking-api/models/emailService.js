const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.email_address,
        pass: process.env.email_password,
    },
    secure: false,
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});


async function sendEmailToClient(receiverEmail, chairId) {
    const mailData = {
        from: process.env.email_address,  // sender address configure in .env file
        to: receiverEmail,   // receiver address
        subject: 'Booking Verification',
        text: 'Booking Approved!',
        html: `<b>Hey there! </b>
                <br> Your booking is approved for seat number ${chairId}<br/>`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailData, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve(false);
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve(true);
            }
        });
    })
}

module.exports = { sendEmailToClient }



