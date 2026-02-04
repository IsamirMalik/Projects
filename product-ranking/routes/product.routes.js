const express = require('express');
const { addProduct, updateMetaData, getProduct, getProductById, getProductsByRating, getProductsByReview, getProductsByReturn } = require('../controllers/product.controller');

const productRouter = express.Router();


productRouter.post('/add', addProduct);

productRouter.patch('/meta-data', updateMetaData);

productRouter.get('/search', getProduct);

productRouter.get('/search/:id', getProductById);

productRouter.get('/sortByRatings', getProductsByRating);

productRouter.get('/sortByReviews', getProductsByReview);

productRouter.get('/sortByReturns', getProductsByReturn);

module.exports = productRouter;