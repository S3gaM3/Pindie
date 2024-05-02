// routes/users.js
const express = require('express');
const usersRouter = express.Router();
const { findAllUsers, createUser, findUserById, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, checkIsUserExists } = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserDeleted } = require('../controllers/users');
const updateUser = require('../middlewares/users').updateUser;
const sendUserUpdated = require('../controllers/users').sendUserUpdated;


usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post('/users', checkIsUserExists, checkEmptyNameAndEmailAndPassword, createUser, sendUserCreated);
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.put('/users/:id', checkEmptyNameAndEmail, updateUser, sendUserUpdated);
usersRouter.delete('/users/:id', deleteUser, sendUserDeleted);


module.exports = usersRouter;
