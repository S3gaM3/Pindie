const mainRouter = require("express").Router();
const fs = require("fs").promises;

mainRouter.get("/", (req, res) => {
    fs.readFile("./public/index.html", "utf8").then((data) => {
        res.header("Content-Type", "text/html").send(data);
    })
});

module.exports = mainRouter;