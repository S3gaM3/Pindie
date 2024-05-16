// middlewares/games.js
const games = require("../models/game");

const findAllGames = async (req, res, next) => {
  try {
    req.gamesArray = await games
      .find({})
      .populate("categories")
      .populate({
        path: "users",
        select: "-password"
      });
    next();
  } catch (error) {
    next(error);
  }
};

const createGame = async (req, res, next) => {
  try {
    req.game = await games.create(req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка создания игры" });
  }
};

const findGameById = async (req, res, next) => {
  try {
    req.game = await games
      .findById(req.params.id)
      .populate("categories")
      .populate("users");
    next();
  } catch (error) {
    res.status(404).send({ message: "Игра не найдена" });
  }
};

const updateGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления игры" });
  }
};

const deleteGame = async (req, res, next) => {
  try {
    req.game = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка удаления игры" });
  }
};

const checkEmptyFields = (req, res, next) => {
  const { title, description, image, link, developer } = req.body;
  if (!title || !description || !image || !link || !developer) {
    res.status(400).send({ message: "Заполните все поля" });
  } else {
    next();
  }
};

const checkIsGameExists = async (req, res, next) => {
  try {
    const isInArray = await games.exists({ title: req.body.title });
    if (isInArray) {
      res.status(400).send({ message: "Игра с таким названием уже существует" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).send({ message: "Ошибка проверки существования игры" });
  }
};

const checkIfCategoriesAvaliable = (req, res, next) => {
  if (!req.body.categories || req.body.categories.length === 0) {
    res.status(400).send({ message: "Выберите хотя бы одну категорию" });
  } else {
    next();
  }
};

const checkIfUsersAreSafe = (req, res, next) => {
  if (!req.body.users) {
    next();
  } else if (req.body.users.length - 1 === req.game.users.length) {
    next();
  } else {
    res.status(400).send({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" });
  }
};

const checkIsVoteRequest = async (req, res, next) => {
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
};

module.exports = {
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe,
  checkIsVoteRequest
};
