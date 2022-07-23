const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verifyToken(req, res, next) {
    try {
        const token = req.header("Authorization");
        console.log(token);
        //token var mı?
        if (!token) {
            res.status(401).send({ error: "Access denied. No token provided." });
            return;
        }

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