const mongoose = require('mongoose');
 
const DB_URL = 'mongodb://localhost:27017/pindie';

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URL);
    console.log('Успешно подключились к mondodb')
    return mongoose.connection;
  }
  catch (err) {
    console.error('При подключении к MongoDB возникла ошибка:', err);
    throw err; // Пробрасываем ошибку для обработки в месте вызова
  }
}

module.exports = connectToDatabase;
