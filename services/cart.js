const CartModel = require('../models/cart');

module.exports.getCartByUserId = async (userId) => {
  try {
    const cart = await CartModel.findOne({ userId }).populate('products.productId');

    if (!cart) {
      throw new Error("No cart found for this user");
    }

    return cart;
  } catch (err) {
    console.log('Error in getting cart by user ID', err.message);
    throw new Error(err.message);
  }
};

module.exports.addToCart = async (userId, productId, quantity, color, text, design) => {
  try {
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex((item) => item.productId.equals(productId));

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update quantity
      cart.products[existingProductIndex].quantity += quantity;
      cart.products[existingProductIndex].color = color;
      cart.products[existingProductIndex].text = text;
      cart.products[existingProductIndex].design = design;
    } else {
      // Product does not exist in the cart, add it
      cart.products.push({ productId, quantity , color , text , design});
    }

    const updatedCart = await cart.save();

    // Use populate on the query, not on the saved document
    const populatedCart = await CartModel.findById(updatedCart._id).populate('products.productId');

    return populatedCart;
  } catch (err) {
    console.log('Error in adding to cart', err);
    throw new Error(err.message);
  }
};

module.exports.removeFromCart = async (userId, productId) => {
  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      throw new Error('Cart not found');
    }

    const updatedProducts = cart.products.filter((item) => !item.productId.equals(productId));
    cart.products = updatedProducts;

    // Save the updated cart
    const updatedCart = await cart.save();

    // Use populate on the query, not on the saved document
    const populatedCart = await CartModel.findById(updatedCart._id).populate('products.productId');

    return populatedCart;
  } catch (err) {
    console.log('Error in removing from cart', err);
    throw new Error('Could not remove from cart');
  }
};


// Update quantity of a product in the cart
module.exports.updateQuantity = async (userId, productId, quantityDelta) => {
  try {
    const cart = await CartModel.findOne({ userId }).populate('products.productId');

    if (!cart) {
      throw new Error('Cart not found');
    }



    // Find the product in the cart
    const productIndex = cart.products.findIndex((product) => product._id.equals(productId));
    if (productIndex === -1) {
      throw new Error('Product not found in the cart');
    }

    // Increase or decrease the quantity
    cart.products[productIndex].quantity += quantityDelta;


    // Limit quantity to 5
    if (cart.products[productIndex].quantity > 5) {
      cart.products[productIndex].quantity = 5;
      throw new Error("Cannnot have more than 5 items of the same Product");
    }

    // Remove the product if quantity is zero
    if (cart.products[productIndex].quantity <= 0) {
      cart.products.splice(productIndex, 1);
    }

    // Save the updated cart
    const updatedCart = await cart.save();
    return updatedCart;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw new Error('Could not update cart quantity : ' + error);
  }
};
