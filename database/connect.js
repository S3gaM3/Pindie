// database/connect.js

const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb://localhost:27017/pindie");
        console.log("Успешно подключились к MongoDB");
    } catch (error) {
        console.log("При подключении возникла ошибка");
        console.log(error);
    }
}

module.exports = { connectToDatabase };
