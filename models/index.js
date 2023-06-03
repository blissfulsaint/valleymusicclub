const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        minLength: 1,
        required: [true, 'User first name required']
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: [true, 'User last name required']
    },
    username: {
        type: String,
        required: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
        required: [true, 'Email required']
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required']
    },
    juniorParticipants: {
        type: Number
    },
    adultParticipants: {
        type: Number
    },
})

const User = mongoose.model('users', userSchema);

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
// db.users = require('./users.js')(mongoose);
db.users = User;


const validateContact = (req, res, next) => {
    const user = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.bdoy.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        juniorParticipants: req.body.juniorParticipants,
        adultParticipants: req.body.adultParticipants
    });

    // user.firstName = req.body.firstName,
    // user.middleName = req.body.middleName,
    // user.lastName = req.body.lastName,
    // user.username = req.body.username,
    // user.password = req.body.password,
    // user.email = req.body.email,
    // user.phone = req.body.phone,
    // user.juniorParticipants = req.body.juniorParticipants,
    // user.adultParticipants = req.body.adultParticipants,

    let error = user.validateSync();

    if (error) {
        res.status(412).send({message: error.message});
    } else {
        next();
    }
}

module.exports = db, validateContact;






// module.exports = db;