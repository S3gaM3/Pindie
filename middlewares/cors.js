// middlewares/cors.js
const { CORS } = require("../config");

function cors(req, res, next) {
  const { origin } = req.headers;

  if (CORS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  }

  next();
}

module.exports = { cors };
