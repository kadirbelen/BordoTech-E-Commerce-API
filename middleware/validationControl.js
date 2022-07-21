const validators = require("../validation/validators");

module.exports = function(schema) {
    return function(req, res, next) {
        const { error } = validators[schema].validate(req.body);
        if (error) {
            // res.status(400).json(error.details[0].message);
            res.status(400).json({
                error: error.details[0].message,
            });
            return;
        } else {
            next();
        }
    };
};