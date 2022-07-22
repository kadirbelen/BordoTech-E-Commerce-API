const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyToken(req, res, next) {
    try {
        const token = req.header("Authorization");
        console.log(token);
        //token var mı?
        if (!token) {
            res.status(401).send("Access denied. No token provided.");
            return;
        }

        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            req.userId = decoded._id;
            if (err) res.status(403).json("Token is not valid");
            next();
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

function verifyAndAuthorizationToken(roles) {
    try {
        return (req, res, next) => {
            verifyToken(req, res, () => {
                User.findById(req.userId).then((user) => {
                    //parametre olarak gönderdiğimiz role kullanıcını rolünü içeriyor mu?
                    if (roles.includes(user.role)) {
                        next();
                    } else {
                        res.status(403).send("You don't have permission for this action");
                        return;
                    }
                });
            });
        };
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { verifyToken, verifyAndAuthorizationToken };