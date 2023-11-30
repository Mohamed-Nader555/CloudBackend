const {Router} = require('express');

const productsController = require('../controllers/products');

const productsRouter = Router();

//GETS
//get all products 
productsRouter.get('/', productsController.getProducts);
//get all products based on color and price
productsRouter.get('/filter/:color?', productsController.filterProductsByColorAndPrice);
// get all products based on category
productsRouter.get('/:category?', productsController.filterProductsByCategory);
// get all products based on category and sub category
productsRouter.get('/:category?/:subCategory?', productsController.filterProductsByCategoryAndSubCategory);


productsRouter.post('/', productsController.createProduct);

productsRouter.put('/:id', productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;