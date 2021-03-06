const router = require("express").Router();
const ProductController = require("../controllers/products.controller");
const productController = new ProductController();

router.get("/products", productController.getAll.bind(productController));
router.get("/products/types", productController.getAllProductTypes);
router.get("/product/:_id", productController.getById.bind(productController));
router.put("/product/:_id", productController.updateProduct.bind(productController));
router.delete("/product/:_id", productController.deleteProduct.bind(productController));
router.post("/product", productController.addProduct.bind(productController));
router.post("/products/types", productController.postProductTypes.bind(productController));


module.exports = router;