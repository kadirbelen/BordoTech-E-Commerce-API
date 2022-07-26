const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyToken(req, res, next) {
    try {
        const authorization = req.header("Authorization");

        if (!authorization) {
            res.status(401).send("Access denied. No token provided.");
            return;
        }

        const token = authorization.split(" ")[1];
        console.log(token);

        jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
            req.userId = decoded._id;
            if (err) res.status(403).json({ error: "Token is not valid" });
            next();
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

function verifyAndAuthorizationToken(roles) {
    try {
        return (req, res, next) => {
            verifyToken(req, res, async() => {
                const user = await User.findById(req.userId);
                if (roles.includes(user.role)) {
                    next();
                } else {
                    res
                        .status(403)
                        .json({ error: "You don't have permission for this action" });
                    return;
                }
            });
        };
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { verifyToken, verifyAndAuthorizationToken };