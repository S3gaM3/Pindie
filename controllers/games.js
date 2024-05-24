function sendAllGames(req, res) {

  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(req.gamesArray));
}

const sendGameById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.game));
};

const sendGameUpdated = (req, res) => {

  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Игра обновлена" }));
}; 


const sendGameCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.game));
}; 

const sendGameDeleted = (req, res) => {
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify(req.game));
}; 

module.exports = {

  sendAllGames,
  sendGameById,
  sendGameCreated,
  sendGameUpdated,
  sendGameDeleted
  
};