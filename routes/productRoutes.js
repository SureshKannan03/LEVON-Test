const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");
const { validateProduct } = require("../middleware/productMiddleware");
const router = express.Router();

//task one Build a RESTful API
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
