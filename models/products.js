const {Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
      name: { type: String, required: true, unique: true},
      color: { type: String },
      category: { type: String, required: true },
      subCategory: { type: String, required: true },
      price: { type: Number, required: true },
      desc: { type: String, required: true },
      userRole: {type : String, required: true},
      status: {type : String, required: true},
      img: { type: String, required: true }
    }
  );

  const  ProductModel = model('Product', ProductSchema);
  module.exports = ProductModel;