const mainRouter = require("./main");
const categoriesRouter = require("./categories");
const usersRouter = require("./users");
const gamesRouter = require("./games");
const apiRouter = require("./apiRouter");
const authRouter = require("./auth")
const pagesRouter = require("./pages");

module.exports = {
    mainRouter,
    categoriesRouter,
    usersRouter,
    gamesRouter,
    apiRouter,
    authRouter,
    pagesRouter
}