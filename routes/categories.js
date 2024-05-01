// Создаём роут для запросов категорий 
const categoriesRouter = require('express').Router();

// Импортируем вспомогательные функции
const findAllCategories = require('../middlewares/categories');
const sendAllCategories = require('../controllers/categories');
const createCategory = require('../middlewares/categories');
const sendCategoryCreated = require('../controllers/categories');
const findCategoryById = require('../middlewares/categories');
const sendCategoryById = require('../controllers/categories');
const updateCategory = require('../middlewares/categories');
const sendCategoryUpdated = require('../controllers/categories');
const deleteCategory = require('../middlewares/categories');
const sendCategoryDeleted = require('../controllers/categories');
const checkIsCategoryExists = require('../controllers/categories');
const checkEmptyName = require('../controllers/categories');
// Обработка POST-запроса для создания категории
categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  createCategory,
  sendCategoryCreated
);

// Обработка GET-запроса для получения всех категорий
categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);


categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  updateCategory,
  sendCategoryUpdated
); 

  categoriesRouter.delete("/categories/:id", deleteCategory, sendCategoryDeleted);
// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
