// controllers/auth.js
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const path = require("path");
const User = require('../models/user'); // Подключаем модель пользователя

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Неправильные почта или пароль");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new Error("Неправильные почта или пароль");
    }

    const token = jwt.sign({ _id: user._id }, "some-secret-key", {
      expiresIn: 3600
    });

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      token: token
    });
  } catch (error) {
    console.error("Ошибка аутентификации:", error);
    res.status(401).json({ message: "Неправильные почта или пароль" });
  }
};

const sendIndex = (req, res) => {
  if (req.cookies.jwt) {
    try {
      jwt.verify(req.cookies.jwt, "some-secret-key");
      return res.redirect("/admin/dashboard");
    } catch (err) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    }
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

module.exports = {
  login,
  sendIndex,
  sendDashboard
};
