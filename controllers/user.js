const db = require('../models');
const User = db.users;

exports.createUser = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create a User
    const user = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        juniorParticipants: req.body.juniorParticipants,
        adultParticipants: req.body.adultParticipants,
    });
    // Save User in the database
    user
        .save(user)
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the User.',
            });
        });
};

exports.getAllUsers = (req, res) => {
    User.find(
        {},
        {
            firstName: 1,
            middleName: 1,
            lastName: 1,
            username: 1,
            password: 1,
            email: 1,
            phone: 1,
            juniorParticipants: 1,
            adultParticipants: 1,
            _id: 0,
        }
    )
        .then((data) => {
            res.status(201).send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving users.',
            });
        });
}

exports.getUser = (req, res) => {
    const _id = req.params._id;

    User.find({ _id: _id })
        .then((data) => {
            if (!data)
                res
                    .status(404)
                    .send({ message: 'Not found User with id ' + _id });
            else res.status(201).send(data[0]);
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error retrieving User with _id=' + _id,
            });
        });
}

exports.updateUser = ((req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update cannot be empty!',
        });
    }

    const _id = req.params._id;

    User.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update User with id=${_id}. Maybe User was not found.`,
                });
            } else res.status(201).send({ message: 'User was updated successfully' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating User with id=' + _id,
            });
        });
});