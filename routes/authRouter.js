const validation = require("../validation/authValidate");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv/config");

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async(req, res) => {
    const error = validation.registerValidate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = new User({...req.body, password: hash });
        await user.save();
        //kullanıcı kayıt olduğunda token oluşturduk
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
        res.json({ token: token });
    } catch (error) {
        res.json(error);
    }
});

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const error = validation.loginValidate({ email, password });

        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).send("Invalid email");
            return;
        }

        const isValid = bcrypt.compareSync(password, user.password);
        console.log(isValid);
        if (!isValid) {
            res.status(400).send("Invalid email or password");
            return;
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN);
        res.json({ token: token });
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;