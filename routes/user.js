const routes = require('express').Router();
const users = require('../controllers/user.js');

routes.get('/', users.getAllUsers);
routes.get('/:_id', users.getUser);

routes.post('/', users.createUser);
routes.put('/:_id', users.updateUser);

module.exports = routes;