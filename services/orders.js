const OrderModel = require('../models/orders');

module.exports.createOrder = async (orderInfo) => {
  try {
    const order = new OrderModel(orderInfo);
    const createdOrder = await order.save();
    return createdOrder;
  } catch (err) {
    console.log('Error in creating order:', err);
    throw new Error('Could not create order');
  }
};

// Add more order-related services as needed
