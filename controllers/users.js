function sendAllUsers(req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(req.usersArray));
}

function sendUserById(req, res) {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(req.user));
}

function sendUserUpdated(req, res) {
  res.header("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Пользователь обновлён" }));
}

const sendUserCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const { password,  ...userWithoutPassword} = req.user.toObject();
  res.end(JSON.stringify(userWithoutPassword));
};

const sendUserDeleted = (req, res) => {
  res.header("Content-Type", "application/json");
  res.status(200).send({ message: "Пользователь успешно удалён" });
}

const sendMe = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.user));
}; 

module.exports = { 
  sendAllUsers, 
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
  sendMe
};