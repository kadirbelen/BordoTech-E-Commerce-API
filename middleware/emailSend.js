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

    Order.find({ userId: req.userId })
      .sort({ _id: -1 })
      .limit(1)
      .populate("cardItems.productId")
      .then((order) => {
        order
          .map((orderDetail) => {
            const mailOptions = {
              from: process.env.GMAIL,
              to: user.email,
              subject: "Siparişiniz oluşturuldu",
              text: `
            Sipariş Numaranız:${orderDetail._id},
            Ürün Detayınız:${orderDetail.cardItems},
            Ödeme Türünüz:${
              orderDetail.payType ? "Kapıda Ödeme" : "Online Ödeme"
            },
            Address:${orderDetail.address}
            `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          })
          .catch((e) => {
            return console.log(e);
          });
      });
  });
}

module.exports = sendEmail;
