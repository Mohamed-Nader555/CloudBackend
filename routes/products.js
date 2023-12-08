const {Router} = require('express');
const multer = require('multer');
const productsController = require('../controllers/products');

const productsRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//GETS
//get all products 
productsRouter.get('/', productsController.getProducts);

//getBy Id
productsRouter.get('/product/:productId', productsController.getProductById);

//get all products based on color and price
productsRouter.get('/filter', productsController.filterProductsByColorAndPrice);

// get all products based on category and filter
productsRouter.get('/filter/:category?', productsController.filterProductsByCategoryAndFilter);

// get all products based on category and sub category and filter
productsRouter.get('/filter/:category?/:subCategory?', productsController.filterProductsByCategoryAndSubCategoryAndFilter);

productsRouter.get('/approved-designer-products', productsController.getApprovedDesignerProducts);

//get pending products
productsRouter.get('/pending', productsController.getPendingProducts);

// get all products based on category
productsRouter.get('/:category?', productsController.filterProductsByCategory);

// get all products based on category and sub category
productsRouter.get('/:category?/:subCategory?', productsController.filterProductsByCategoryAndSubCategory);





// productsRouter.post('/', productsController.createProduct);

productsRouter.post('/', upload.single('img'), productsController.createProduct);

productsRouter.put('/:id', productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);



module.exports = productsRouter;