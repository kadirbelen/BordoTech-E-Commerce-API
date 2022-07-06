const validation = require("../validation/authValidate");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", (req, res) => {
    const error = validation.registerValidate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({...req.body, password: hash });
    user
        .save()
        .then((u) => {
            //kullanıcı kayıt olduğunda token oluşturduk
            const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
            res.header("Authorization", token).json({ accessToken: token }); //token header kısmına yolladık
            res.json(token);
            //
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const error = validation.loginValidate({ email, password });

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    User.findOne({ email })
        .then((user) => {
            const isValid = bcrypt.compareSync(password, user.password);
            if (!user && !isValid) {
                res.status(400).send("Invalid email or password");
                return;
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_CODE);

            res.header("Authorization", token).json({ accessToken: token });
        })
        .catch(() => {
            res.status(400).send("Invalid email or password");
        });
    // const isValid = bcrypt.compareSync(password, req.body.password);
});

module.exports = router;