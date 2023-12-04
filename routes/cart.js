const { Router } = require('express');
const cartController = require('../controllers/cart');

const cartRouter = Router();

cartRouter.get('/:userId', cartController.getCartByUserId);
cartRouter.post('/:userId/add', cartController.addToCart);
cartRouter.post('/:userId/remove', cartController.removeFromCart);
cartRouter.post('/:userId/update-quantity', cartController.updateQuantity);

module.exports = cartRouter;
