// routes/api.js
const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const categoriesRouter = require('./categories');
const gamesRouter = require('./games');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/games', gamesRouter);
router.use('/categories', categoriesRouter);
router.use('/auth', authRouter);

module.exports = router;
