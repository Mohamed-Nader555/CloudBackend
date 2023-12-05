const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
  amount: { type: Number, required: true },
  billingAddress: {
    name: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
});

const OrderModel = model('Order', OrderSchema);
module.exports = OrderModel;
