const nodemailer = require("nodemailer");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

async function sendEmail(req, res) {
    const user = await User.findById(req.userId);

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    console.log("email", user.email);
    const order = await Order.find({ userId: req.userId })
        .sort({ _id: -1 })
        .limit(1)
        .populate("cardItems.productId");

    var mailOptions = null;

    order.map((item) => {
        console.log("card", item.cardItems);
        mailOptions = {
            from: process.env.GMAIL,
            to: user.email,
            subject: "Siparişiniz oluşturuldu",
            text: `
Sipariş Numaranız:${item._id},
Ürün Detayınız:${item.cardItems},
Ödeme Türünüz:${item.payType},
Address:${item.address}
`,
        };
    });

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = sendEmail;