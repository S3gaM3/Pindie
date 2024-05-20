const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages");
const connectToDatabase = require('./database/connect');
const cors = require('./middlewares/cors');
const apiRouter = require('./routes/apiRouter');
const PORT = 3001;
const app = express();

// Подключение к базе данных
connectToDatabase();

// Использование middlewares
app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());

// Маршруты для страниц
app.use(pagesRouter);

// Маршруты для API
app.use('/api', apiRouter);

// Статические файлы
app.use(express.static(path.join(__dirname, "public")));

// Обработка 404 ошибок
app.use((req, res, next) => {
  res.status(404).send("404 Not Found");
});

// Обработка других ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
