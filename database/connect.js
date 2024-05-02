const mongoose = require('mongoose');
 
const DB_URL = 'mongodb://localhost:27017/pindie';

async function connectToDatabase() {
  try {
    // Подключение к БД
    await mongoose.connect(DB_URL);
    console.log('Успешно подключились к MongoDB');
  }
  catch (err) {
    // Обработка ошибки при подключении к базе
    console.log('При подключении к MongoDB возникла ошибка');
    console.error(err);
  }
}

module.exports = connectToDatabase;
