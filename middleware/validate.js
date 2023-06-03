const db = require('../models');
const mongoose = require('mongoose');
const User = db.users;

exports.validateContact = (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        juniorParticipants: req.body.juniorParticipants,
        adultParticipants: req.body.adultParticipants
    });

    let error = user.validateSync();

    if (error) {
        res.status(412).send({message: error.message});
    } else {
        next();
    }
}