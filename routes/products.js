const {Router} = require('express');

const productsController = require('../controllers/products');

const productsRouter = Router();

//GETS
//get all products 
productsRouter.get('/', productsController.getProducts);

//getBy Id
productsRouter.get('/:productId', productsController.getProductById);

//get all products based on color and price
productsRouter.get('/filter', productsController.filterProductsByColorAndPrice);

// get all products based on category and filter
productsRouter.get('/filter/:category?', productsController.filterProductsByCategoryAndFilter);

// get all products based on category and sub category and filter
productsRouter.get('/filter/:category?/:subCategory?', productsController.filterProductsByCategoryAndSubCategoryAndFilter);

// get all products based on category
productsRouter.get('/:category?', productsController.filterProductsByCategory);

// get all products based on category and sub category
productsRouter.get('/:category?/:subCategory?', productsController.filterProductsByCategoryAndSubCategory);

//get pending products
productsRouter.get('/get-pending', productsController.getPendingProducts);




productsRouter.post('/', productsController.createProduct);

productsRouter.put('/:id', productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;