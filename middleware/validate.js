const validate = require('../helpers/validate');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',   // fixed key name
        lastName: 'required|string',
        email: 'required|email',
        favoriteColor: 'required|string',
        birthday: 'string'                // use 'date' if your validator supports it; otherwise keep 'string'
    };
    validate(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            return next();
        }
    });
};

module.exports = { saveContact };
