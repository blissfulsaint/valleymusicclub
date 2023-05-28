const routes = require('express').Router();
const users = require('../controllers/user');

const validation = require('../middleware/validate.js');

routes.get('/', users.getAllUsers);
routes.get('/:_id', users.getUser);

routes.post('/', validation.saveContact, users.createUser);
routes.put('/:_id', validation.saveContact, users.updateUser);

routes.delete('/:_id', users.deleteUser);

module.exports = routes;