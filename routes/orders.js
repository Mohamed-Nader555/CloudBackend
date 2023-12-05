const { Router } = require('express');
const orderController = require('../controllers/orders');

const orderRouter = Router();

// Create a new order
orderRouter.post('/', orderController.createOrder);

// Add more order-related routes as needed

module.exports = orderRouter;
