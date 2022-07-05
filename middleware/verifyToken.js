const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const verifyToken = (roles) => {
//     return (req, res, next) => {
//         const authorization = req.header("Authorization");
//         console.log(authorization);
//         if (!authorization) {
//             res.status(401).send("Access denied. No token provided.");
//             return;
//         }
//         console.log(req);
//         const token = authorization.split(" ")[1];
//         jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
//             if (err) {
//                 res.status(401).send("Invalid token.");
//                 return;
//             }
//             else if()
//             req.userId = decoded._id;
//             console.log(req.body.role);
//             next();
//         });
//     };
// };

function verifyToken(req, res, next) {
    const authorization = req.header("Authorization");
    console.log(authorization);
    if (!authorization) {
        res.status(401).send("Access denied. No token provided.");
        return;
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        req.userId = decoded._id;

        User.findById(req.userId).then((user) => {
            if (user.role == "admin") {
                next();
            } else {
                res.status(401).send("Invalid token or you have to be admin");
                return;
            }
        });
    });
}

module.exports = verifyToken;