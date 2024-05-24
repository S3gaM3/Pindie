const { userModel } = require("../models");
const bcrypt = require("bcryptjs");

async function findAllUsers(req, res, next) {
    req.usersArray = await userModel.find({}, { password: 0 });
    next();
}

const findUserById = async (req, res, next) => {
    console.log("GET /users/:id");
    try {
      req.user = await userModel.findById(req.params.id, { password: 0 });
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
    }
}; 

async function updateUser(req, res, next) {
  try {
    req.game = await userModel.findByIdAndUpdate(req.params.id, req.body, { password: 0 });
    next();
  } catch (error) {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Ошибка в обновлении пользователя" });
  }
}

const createUser = async (req, res, next) => {
    console.log("POST /users");
    try {
      console.log(req.body)
      req.user = await userModel.create(req.body);
      next();
    } catch (error) {
      console.log(error)
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка создания пользователя" }));
    }
}; 

const deleteUser = async (req, res, next) => {
  try {
    req.user = await userModel.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Ошибка удаления пользователя"} );
  }
}

function checkEmptyNameAndEmailAndPassword(req, res, next) {
  if (req.body.username == "" || req.body.email == "" || req.body.password == "") {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Заполните все поля!" });
  } else {
    next();
  }
}

function checkEmptyNameAndEmail(req, res, next) {
  if (req.body.username == "" || req.body.email == "" || req.body.password || req.body.password == "") {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Заполните все поля!" });
  } else {
    next();
  }
}

function checkIsUserExists(req, res, next) {
  if (req.usersArray.find(item => { item.username == req.body.username})) {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Такой пользователь уже существует" });
  } else {
    next();
  }
}

const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
}; 

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUser,
    deleteUser,
    checkEmptyNameAndEmailAndPassword,
    checkEmptyNameAndEmail,
    checkIsUserExists,
    hashPassword
};