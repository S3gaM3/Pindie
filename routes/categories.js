const express = require('express');
const categoriesRouter = express.Router();
const { findAllCategories, createCategory, findCategoryById, deleteCategory, checkEmptyName, checkIsCategoryExists } = require('../middlewares/categories');
const { sendAllCategories, sendCategoryCreated, sendCategoryById, sendCategoryDeleted } = require('../controllers/categories');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get('/categories/:id', findCategoryById, sendCategoryById);
categoriesRouter.post('/categories', checkEmptyName, checkIsCategoryExists, createCategory, sendCategoryCreated);
categoriesRouter.delete('/categories/:id', deleteCategory, sendCategoryDeleted);

module.exports = categoriesRouter;
