const { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryUpdated, sendCategoryDeleted } = require("./categories");
const { sendMe, sendAllUsers, sendUserCreated, sendUserById, sendUserUpdated, sendUserDeleted } = require("./users");
const { sendAllGames, sendGameCreated, sendGameById, sendGameUpdated, sendGameDeleted } = require("./games");
const { sendDashboard, sendIndex, login } = require("./auth");

module.exports = {
    sendAllCategories,
    sendCategoryCreated,
    sendAllUsers,
    sendUserCreated,
    sendAllGames,
    sendGameCreated,
    sendGameById,
    sendCategoryById,
    sendUserById,
    sendGameUpdated,
    sendCategoryUpdated,
    sendUserUpdated,
    sendGameDeleted,
    sendUserDeleted,
    sendCategoryDeleted,
    login,
    sendMe,
    sendIndex,
    sendDashboard
}