const express = require("express");
const pagesRouter = express.Router();
const { sendIndex, sendDashboard } = require("../controllers/auth.js");
const { checkCookiesJWT, checkAuth } = require("../middlewares/auth.js");

pagesRouter.get("/", sendIndex);
pagesRouter.get("/admin/**", checkCookiesJWT, checkAuth, sendDashboard); 

module.exports = pagesRouter;
