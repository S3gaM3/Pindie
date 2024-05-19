const allowedCors = [
  'https://practicum.yandex.ru',
  'http://practicum.yandex.ru',
  'http://localhost:3000',
];

function cors(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Если требуется передача cookies
  }

  // Если это предварительный запрос, сразу отправляем ответ с разрешенными методами
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
}

module.exports = cors;
