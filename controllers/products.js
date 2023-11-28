const { create } = require('../models/products');
const productsService = require('../services/products');

module.exports.getProducts = async (req , res) => {
    try{
        const products = await productsService.findAllProducts();
        res.send({ products });
        }catch(err){
            console.log("Error in getting all the products", err);
            res.status(500).send({error: "Internal Server Error" , err});
        }
    
}

// route handler function to add product 
module.exports.createProduct = async (req,res)=>{
    const productInfo = {
        name: req.body.name,
        color: req.body.color,
        category: req.body.category,
        subCategory: req.body.subCategory,
        price: req.body.price,
        img: req.body.img,
        desc: req.body.desc
    };

    try {
        const createdProduct = await productsService.addNewProduct(productInfo);
        return res.status(201).send({
            msg: 'Product created successfully',
            productID: createdProduct._id
        });
    }catch (err){
        return res.status(500).send({
            error: err.msg
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
        desc: req.body.desc
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