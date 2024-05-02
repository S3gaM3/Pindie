// middlewares/categories.js
const categories = require('../models/category');

const findAllCategories = async (req, res, next) => {
    req.categoriesArray = await categories.find({});
    next();
}

const createCategory = async (req, res, next) => {
  try {
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

const findCategoryById = async (req, res, next) => {
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};

const checkEmptyName = (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите название категории" }));
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  try {
    const isInArray = await categories.exists({ name: req.body.name });
    if (isInArray) {
      res.setHeader("Content-Type", "application/json");
      res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
    } else {
      next();
    }
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send(JSON.stringify({ message: "Ошибка проверки существования категории" }));
  }
};

module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  deleteCategory,
  checkEmptyName,
  checkIsCategoryExists
};
