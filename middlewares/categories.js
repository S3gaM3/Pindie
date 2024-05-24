const { categoryModel } = require("../models");

async function findAllCategories(req, res, next) {
    req.categoriesArray = await categoryModel.find({});
    next();
}

const findCategoryById = async (req, res, next) => {
    console.log("GET /categories/:id");
    try {
      req.category = await categoryModel.findById(req.params.id);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
          res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
    }
}; 

async function updateCategory(req, res, next) {
  try {
    req.category = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Ошибка при обновлении категории" });
  }
}

const createCategory = async (req, res, next) => {
    console.log("POST /categories");
    try {
        console.log(req.body);
      req.category = await categoryModel.create(req.body);
      next();
    } catch (error) {
      res.setHeader("Content-Type", "application/json");
          res.status(400).send(JSON.stringify({ message: "Ошибка создания категории" }));
    }
}; 

const deleteCategory = async (req, res, next) => {
  try {
    req.game = await categoryModel.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Ошибка удаления категории" });
  }
}

const checkIsCategoryExists = async (req, res, next) => {
  // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
  // с которым хотим создать новую категорию
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
        res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
  } else {
  // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
}; 

function checkEmptyName(req, res, next) {
  if (req.body.name == "") {
    res.header("Content-Type", "application/json");
    res.status(400).send({ message: "Заполните все поля!" });
  } else {
    next();
  }
}

module.exports = {
    findAllCategories,
    findCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    checkIsCategoryExists,
    checkEmptyName
}