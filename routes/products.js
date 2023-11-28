const {Router} = require('express');

const productsController = require('../controllers/products');

const productsRouter = Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;