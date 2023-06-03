const routes = require('express').Router();
const users = require('../controllers/user');

const validation = require('../middleware/validate');

routes.get('/', users.getAllUsers);
routes.get('/:_id', users.getUser);

routes.post('/', validation.validateContact, users.createUser);
routes.put('/:_id', validation.validateContact, users.updateUser);

routes.delete('/:_id', users.deleteUser);

module.exports = routes;