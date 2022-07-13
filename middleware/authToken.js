const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
    if (err) res.status(403).json("Token is not valid");
    next();
  });
}

function verifyAndAuthorizationToken(req, res, next) {
  verifyToken(req, res, () => {
    User.findById(req.userId).then((user) => {
      //admin mi?
      if (user.role) {
        next();
      } else {
        res.status(403).send("Invalid token or you have to be admin");
        return;
      }
    });
  });
}

module.exports = { verifyToken, verifyAndAuthorizationToken };
