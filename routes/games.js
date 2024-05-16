// routes/games.js
const express = require('express');
const gamesRouter = express.Router();
const { checkAuth } = require("../middlewares/auth.js");
const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkEmptyFields, checkIsGameExists, checkIfCategoriesAvaliable, checkIfUsersAreSafe,  checkIsVoteRequest } = require('../middlewares/games');
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require('../controllers/games');

gamesRouter.get('/games', findAllGames, sendAllGames);
gamesRouter.post('/games', checkAuth, checkEmptyFields, checkIsGameExists, checkIfCategoriesAvaliable, createGame, sendGameCreated);
gamesRouter.get('/games/:id', findGameById, checkIsVoteRequest, sendGameById);
gamesRouter.put('/games/:id', checkAuth, findGameById, checkIfUsersAreSafe, checkIfCategoriesAvaliable, checkEmptyFields, updateGame, sendGameUpdated);
gamesRouter.delete('/games/:id', checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
