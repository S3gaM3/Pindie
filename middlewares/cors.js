const allowedCors = [
  'https://practicum.yandex.ru',
  'http://practicum.yandex.ru',
  'http://localhost:3000'
];

function cors(req, res, next) {
  // Проверяем наличие свойств в объекте req.headers перед их деструктуризацией
  if (req.headers && req.headers.origin) {
    const { origin } = req.headers;
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      // Если метод запроса - OPTIONS, завершаем обработку здесь
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
    }
  }
  next();
}

  
  
  
  module.exports = cors;
  