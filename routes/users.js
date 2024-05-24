const usersRouter = require("express").Router();
const { checkAuth, findAllUsers, createUser, findUserById, updateUser, deleteUser, checkEmptyNameAndEmailAndPassword, checkIsUserExists, checkEmptyNameAndEmail, hashPassword } = require("../middlewares");
const { sendAllUsers, sendUserCreated, sendUserUpdated, sendUserDeleted, sendUserById, sendMe } = require("../controllers");

usersRouter.get("/users", findAllUsers, sendAllUsers);

usersRouter.get("/users/:id", findUserById, sendUserById);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
); 

usersRouter.get("/me", checkAuth, sendMe); 

module.exports = usersRouter;