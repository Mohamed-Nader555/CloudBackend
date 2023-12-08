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
module.exports.addNewProduct = async (productInfo ) => {
  try {


    // Check if a product with the same name already exists
    const existingProduct = await ProductModel.findOne({ name: productInfo.name });

    if (existingProduct) {
      throw new Error('Product with the same name already exists');
    }

    const product = new ProductModel(productInfo);
    const createdProduct = await product.save();
    return createdProduct;
  } catch (err) {
    console.log("Error in adding a new product");
    throw new Error('Could not create product : ' + err.message);
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
      desc: productInfo.desc,
      userRole: productInfo.userRole,
      status: productInfo.status
    }, { new: true });
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
module.exports.filterProductsColorPrice = async (color, minPrice, maxPrice) => {
  try {
    let filter = {};

    if (color) {
      filter.color = color;
    }

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (!isNaN(minPrice)) {
      filter.price = { $gte: parseFloat(minPrice) };
    } else if (!isNaN(maxPrice)) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    filter.status = "approved";

    const filteredProducts = await ProductModel.find(filter);
    return filteredProducts;
  } catch (err) {
    console.log('Error in filtering products', err);
    throw new Error('Could not filter products');
  }
};

//service to get products based on filter basaed on category and sub category
module.exports.filterProductsCategorySubCategory = async (category, subCategory) => {
  try {
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    filter.status = "approved";


    const filteredProducts = await ProductModel.find(filter);
    return filteredProducts;
  } catch (err) {
    console.log('Error in filtering products', err);
    throw new Error('Could not filter products');
  }
};


module.exports.filterProductsByCategory = async (category) => {
  try {

    let filter = {};

    if (category) {
      filter.category = category;
    }

    filter.status = "approved";
    
    const filteredProducts = await ProductModel.find(filter);
    return filteredProducts;
  } catch (err) {
    console.log('Error in filtering products by category', err);
    throw new Error('Could not filter products by category');
  }
};


// Service to get products based on category and filter
module.exports.filterProductsByCategoryAndFilter = async (category, color, minPrice, maxPrice) => {
  try {
    let filter = { category };

    if (color) {
      filter.color = color;
    }
    

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (!isNaN(minPrice)) {
      filter.price = { $gte: parseFloat(minPrice) };
    } else if (!isNaN(maxPrice)) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    filter.status = "approved";

    const filteredProducts = await ProductModel.find(filter);
    return filteredProducts;
  } catch (err) {
    console.log('Error in filtering products', err);
    throw new Error('Could not filter products');
  }
};

// Service to get products based on category, sub-category, and filter
module.exports.filterProductsByCategoryAndSubCategoryAndFilter = async (category, subCategory, color, minPrice, maxPrice) => {
  try {
    let filter = { category };

    if (subCategory) {
      filter.subCategory = subCategory;
    }

    if (color) {
      filter.color = color;
    }

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (!isNaN(minPrice)) {
      filter.price = { $gte: parseFloat(minPrice) };
    } else if (!isNaN(maxPrice)) {
      filter.price = { $lte: parseFloat(maxPrice) };
    }

    filter.status = "approved";

    const filteredProducts = await ProductModel.find(filter);
    return filteredProducts;
  } catch (err) {
    console.log('Error in filtering products', err);
    throw new Error('Could not filter products');
  }
};


module.exports.getPendingProducts = async () => {
  try {

    let filter = {};

    filter.status = "pending";
    const pendingProducts = await ProductModel.find(filter);
    return pendingProducts;
  } catch (err) {
    console.log('Error in getting pending products', err);
    throw new Error('Could not get pending products');
  }
};

exports.findProductById = async (productId) => {
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  } catch (error) {
    console.error('Error in findProductById service:', error);
    throw new Error('Could not find product');
  }
};



module.exports.getApprovedDesignerProducts = async () => {
  try {
    // Fetch products with userRole designer and status approved
    const approvedDesignerProducts = await ProductModel.find({
      userRole: 'designer',
      status: 'approved',
    });

    return approvedDesignerProducts;
  } catch (err) {
    console.log('Error in fetching approved designer products', err);
    throw new Error('Could not fetch approved designer products');
  }
};