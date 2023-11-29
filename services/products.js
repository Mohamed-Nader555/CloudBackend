const ProductModel = require('../models/products')

//service to get all products
module.exports.findAllProducts = async () => {
    try {
        const products = await ProductModel.find();
        return products;
    } catch (err) {
        throw new Error('Could not retrieve products')
    }
};

//service to add a new product (create product)
module.exports.addNewProduct = async (productInfo) => {
    try {
        const product = new ProductModel({
            name: productInfo.name,
            color: productInfo.color,
            category: productInfo.category,
            subCategory: productInfo.subCategory,
            price: productInfo.price,
            img: productInfo.img,
            desc: productInfo.desc
        });
        const createdProduct = await product.save();
        return createdProduct;
    } catch (err) {
        console.log("Error in adding a new product");
        throw new Error('Could not create product');
    }
};

//service to update the product based on its id
module.exports.updateProductById = async (productId, productInfo) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
            name: productInfo.name,
            color: productInfo.color,
            category: productInfo.category,
            subCategory: productInfo.subCategory,
            price: productInfo.price,
            img: productInfo.img,
            desc: productInfo.desc
        }, {new: true});
        return updatedProduct;
    } catch (err) {
        console.log("Error in updating product by id");
        throw new Error('Could not update product');
    }
};

//service to delete a product based on it's id 
module.exports.deleteProductById = async (productId) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        return deletedProduct;
    } catch (err) {
        console.log("Error in deleting product by id");
        throw new Error('Could not delete product');
    }
};


//service to get products based on filter (color, maxPrice and minPrice)
module.exports.filterProducts = async (color, minPrice, maxPrice) => {
    try {
      let filter = {};
  
      if (color) {
        filter.color = color;
      }
  
      if (minPrice !== undefined && maxPrice !== undefined) {
        filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
      }
  
      const filteredProducts = await ProductModel.find(filter);
      return filteredProducts;
    } catch (err) {
      console.log('Error in filtering products', err);
      throw new Error('Could not filter products');
    }
  };

//service to get products based on filter basaed on category and sub category
  module.exports.filterProducts = async (category, subCategory) => {
    try {
      let filter = {};
  
      if (category) {
        filter.category = category;
      }
  
      if (subCategory) {
        filter.subCategory = subCategory;
      }
  
      const filteredProducts = await ProductModel.find(filter);
      return filteredProducts;
    } catch (err) {
      console.log('Error in filtering products', err);
      throw new Error('Could not filter products');
    }
  };


  module.exports.filterProductsByCategory = async (category) => {
    try {
      const filteredProducts = await ProductModel.find({ category });
      return filteredProducts;
    } catch (err) {
      console.log('Error in filtering products by category', err);
      throw new Error('Could not filter products by category');
    }
  };

// module.exports.findProductById = async (productId) => {
//     try {
//         const product = await ProductModel.findById(productId);
//         return product;
//     } catch (err) {
//         console.log("Error in finding product by id");
//         throw new Error('Could not find product');
//     }
// };