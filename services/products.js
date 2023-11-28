const ProductModel = require('../models/products')


module.exports.findAllProducts = async () => {
    try {
        const products = await ProductModel.find();
        return products;
    } catch (err) {
        throw new Error('Could not retrieve products')
    }
};


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


module.exports.deleteProductById = async (productId) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        return deletedProduct;
    } catch (err) {
        console.log("Error in deleting product by id");
        throw new Error('Could not delete product');
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