const { create } = require('../models/products');
const productsService = require('../services/products');

//fucntion that connect between the route and the service that get all products
module.exports.getProducts = async (req , res) => {
    try{
        const products = await productsService.findAllProducts();
        res.send({ products });
        }catch(err){
            console.log("Error in getting all the products", err);
            res.status(500).send({error: "Internal Server Error" , err});
        }
    
}

module.exports.createProduct = async (req, res) => {
    const productInfo = {
        name: req.body.name,
        color: req.body.color,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        desc: req.body.desc,
        userRole: req.body.userRole,
        img: req.file.buffer.toString('base64')
    };

    try {
        // Set default status to 'pending'
        let status = 'pending';

        // Check userRole and update status accordingly
        if (productInfo.userRole === 'admin') {
            status = 'approved';
        }

        // Add status to productInfo
        productInfo.status = status;

        const createdProduct = await productsService.addNewProduct(productInfo);
        return res.status(201).send({
            msg: 'Product created successfully',
            productID: createdProduct._id
        });
    } catch (err) {
        return res.status(500).send({
            error: err.message
        });
    }
};


module.exports.updateProduct = async (req, res) => {
    const productID = req.params.id;
    const productInfo = {
        name: req.body.name,
        color: req.body.color,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        img: req.body.img,
        desc: req.body.desc,
        userRole: req.body.userRole,
        status: req.body.status
    };

    try {
        const updatedProduct = await productsService.updateProductById(productID, productInfo);
        if (updatedProduct === null) {
            return res.status(404).send({ error: 'Product not found' });
        }
        return res.status(200).send({
            msg: 'Product updated successfully',
            productID: updatedProduct._id
        });

    } catch (err) {
        console.log("Error in updating the product", err);
        res.status(500).send({ error: "Internal Server Error", err });
    }
};

module.exports.deleteProduct = async (req, res) => {
    const productID = req.params.id;

    try {
        const deletedProduct = await productsService.deleteProductById(productID);
        if (deletedProduct === null) {
            return res.status(404).send({ error: 'Product not found' });
        }
        return res.status(200).send({
            msg: 'Product deleted successfully',
            productID: deletedProduct._id
        });

    } catch (err) {
        console.log("Error in deleting the product", err);
        res.status(500).send({ error: "Internal Server Error", err });
    }
};



//function to filter products based on price and color
module.exports.filterProductsByColorAndPrice = async (req, res) => {
    const color = req.query.color;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
  
    try {
      const filteredProducts = await productsService.filterProductsColorPrice(color, minPrice, maxPrice);
      res.send({ products: filteredProducts });
    } catch (err) {
      console.log('Error in filtering products', err);
      res.status(500).send({ error: 'Internal Server Error', err });
    }
  };


  module.exports.filterProductsByCategoryAndSubCategory = async (req, res) => {
    const category = req.params.category;
    const subCategory = req.params.subCategory;
  
    try {
      const filteredProducts = await productsService.filterProductsCategorySubCategory(category, subCategory);
      res.send({ products: filteredProducts });
    } catch (err) {
      console.log('Error in filtering products', err);
      res.status(500).send({ error: 'Internal Server Error', err });
    }
  };

  
module.exports.filterProductsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
      const filteredProducts = await productsService.filterProductsByCategory(category);
      res.send({ products: filteredProducts });
    } catch (err) {
      console.log('Error in filtering products by category', err);
      res.status(500).send({ error: 'Internal Server Error', err });
    }
  };


  // Get all products based on category and filter
module.exports.filterProductsByCategoryAndFilter = async (req, res) => {
    const category = req.params.category;
    console.log(category)
    const color = req.query.color;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
  
    try {
      const filteredProducts = await productsService.filterProductsByCategoryAndFilter(category, color, minPrice, maxPrice);
      res.send({ products: filteredProducts });
    } catch (err) {
      console.log('Error in filtering products', err);
      res.status(500).send({ error: 'Internal Server Error', err });
    }
  };
  
  // Get all products based on category and sub-category and filter
  module.exports.filterProductsByCategoryAndSubCategoryAndFilter = async (req, res) => {
    const category = req.params.category;
    const subCategory = req.params.subCategory;
    const color = req.query.color;
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
  
    try {
      const filteredProducts = await productsService.filterProductsByCategoryAndSubCategoryAndFilter(category, subCategory, color, minPrice, maxPrice);
      res.send({ products: filteredProducts });
    } catch (err) {
      console.log('Error in filtering products', err);
      res.status(500).send({ error: 'Internal Server Error', err });
    }
  };


  // Get pending products
module.exports.getPendingProducts = async (req, res) => {
  try {
    const pendingProducts = await productsService.getPendingProducts();
    res.send({ products: pendingProducts });
  } catch (err) {
    console.log('Error in getting pending products', err);
    res.status(500).send({ error: 'Internal Server Error', err });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productsService.findProductById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductById controller:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getApprovedDesignerProducts = async (req, res) => {
  try {
    const approvedDesignerProducts = await productsService.getApprovedDesignerProducts();
    res.send({ products: approvedDesignerProducts });
  } catch (err) {
    console.log('Error in getting approved designer products', err);
    res.status(500).send({ error: 'Internal Server Error', err });
  }
};