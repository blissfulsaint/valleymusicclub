const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        middleName: 'required|string',
        lastName: 'required|string',
        username: 'required|string',
        password: 'required|string',
        email: 'required|email',
        phone: 'required|string',
        juniorParticipants: 'required|string',
        adultParticipants: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveContact
};