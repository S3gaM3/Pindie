// routes/games.js

const gamesRouter = require("express").Router();

const { Authorize } = require("../middlewares/auth");

const {
  createGame,
  findAllGames,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
  checkIsVoteRequest,
  checkIsGameNameUnique, // добавляем импорт для checkIsGameNameUnique
} = require("../middlewares/games");

const {
  sendGameCreated,
  sendAllGames,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

gamesRouter.post(
  "/games",
  Authorize,
  checkEmptyFields,
  checkIfCategoriesAvaliable,
  checkIsGameNameUnique, // добавляем проверку уникальности при создании
  createGame,
  sendGameCreated,
);

gamesRouter.get("/games", findAllGames, sendAllGames);

gamesRouter.get("/games/:id", findGameById, sendGameById);

gamesRouter.put(
  "/games/:id",
  Authorize,
  findGameById,
  checkIsVoteRequest, // добавляем checkIsVoteRequest здесь
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameNameUnique, // добавляем проверку уникальности при обновлении
  updateGame,
  sendGameUpdated,
);

gamesRouter.delete("/games/:id", Authorize, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
