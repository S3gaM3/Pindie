const express = require('express');
const usersRouter = express.Router();
const { findAllUsers, createUser, findUserById, deleteUser, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail, checkIsUserExists, updateUser, hashPassword } = require('../middlewares/users');
const { sendAllUsers, sendUserCreated, sendUserById, sendUserDeleted, sendUserUpdated, sendMe } = require('../controllers/users');
const { checkAuth } = require("../middlewares/auth.js");

usersRouter.get('/users', findAllUsers, sendAllUsers);
usersRouter.post(
    "/users",
    findAllUsers,
    checkIsUserExists,
    checkEmptyNameAndEmailAndPassword,
    hashPassword,
    createUser,
    sendUserCreated
  ); 
usersRouter.get('/users/:id', findUserById, sendUserById);
usersRouter.put('/users/:id', checkEmptyNameAndEmail, updateUser, sendUserUpdated);
usersRouter.delete('/users/:id', deleteUser, sendUserDeleted);
usersRouter.get("/me", checkAuth, sendMe);

module.exports = usersRouter;
