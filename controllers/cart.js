const cartService = require('../services/cart');

module.exports.getCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await cartService.getCartByUserId(userId);
    res.send({ cart });
  } catch (err) {
    console.log('Error in getting cart by user ID', err);
    res.status(500).send({ error: 'Internal Server Error', err: err.message });
  }
};

module.exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantity, color, text, design } = req.body;

  try {
    const updatedCart = await cartService.addToCart(userId, productId, quantity , color, text, design);
    res.status(200).send({ msg: 'Product added to cart successfully', cart: updatedCart });
  } catch (err) {
    console.log('Error in adding to cart', err);
    res.status(500).send({ error: 'Internal Server Error', err: err.message });
  }
};

module.exports.removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const { productId } = req.body;

  try {
    const updatedCart = await cartService.removeFromCart(userId, productId);
    res.status(200).send({ msg: 'Product removed from cart successfully', cart: updatedCart });
  } catch (err) {
    console.log('Error in removing from cart', err);
    res.status(500).send({ error: 'Internal Server Error', err: err.message });
  }
};


// Increase or decrease quantity of a product in the cart
module.exports.updateQuantity = async (req, res) => {
  const userId = req.params.userId;
  const { productId, quantityDelta } = req.body;

  try {
    const updatedCart = await cartService.updateQuantity(userId, productId, quantityDelta);
    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    res.status(500).json({ error: error.message });
  }
};