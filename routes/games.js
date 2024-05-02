// routes/games.js
const express = require('express');
const gamesRouter = express.Router();
const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIsGameExists, checkIfCategoriesAvaliable, checkIfUsersAreSafe } = require('../middlewares/games');
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post('/games', checkEmptyFields, checkIsGameExists, checkIfCategoriesAvaliable, createGame, sendGameCreated);
gamesRouter.get('/games/:id', findGameById, sendGameById);
gamesRouter.put('/games/:id', findGameById, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, updateGame, sendGameUpdated);
gamesRouter.delete('/games/:id', deleteGame, sendGameDeleted);

module.exports = gamesRouter;
