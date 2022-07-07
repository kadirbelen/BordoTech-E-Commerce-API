const nodemailer = require("nodemailer");
const User = require("../models/User");
const Order = require("../models/Order");

function sendEmail(req, res, next) {
    User.findById(req.userId).then((user) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASSWORD,
            },
        });
        console.log(req.body);

        // Order.find({ userId: req.userId })

        // .then((order) => {
        //         console.log("order", order);
        //         const mailOptions = {
        //             from: process.env.GMAIL,
        //             to: user.email,
        //             subject: "Siparişiniz oluşturuldu",
        //             text: `${order}`,
        //         };

        //         transporter.sendMail(mailOptions, function(error, info) {
        //             if (error) {
        //                 console.log(error);
        //             } else {
        //                 console.log("Email sent: " + info.response);
        //             }
        //         });
        //     })
        //     .catch((e) => {
        //         return console.log(e);
        //     });
    });
}

module.exports = sendEmail;