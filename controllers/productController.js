const productModel = require("../models/productModel");

module.exports = {
  getAllProducts: (req, res) => {
    res.json(productModel.getAllProducts());
  },
  getProductById: async (req, res) => {
    const product = productModel.getProductById(parseInt(req.params.id, 10));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ success: true, data: product });
  },
  createProduct: async (req, res) => {
    const validation = req.isSuccess;
    if (validation) {
      const newProduct = productModel.createProduct(req.body);
      res.status(201).json(newProduct);
    }
  },
  updateProductById: async (req, res) => {
    const validation = req.isSuccess;
    if (validation) {
      const updatedProduct = productModel.updateProductById(
        parseInt(req.params.id, 10),
        req.body
      );
      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(updatedProduct);
    }
  },
  deleteProductById: async (req, res) => {
    const success = productModel.deleteProductById(parseInt(req.params.id, 10));
    if (!success) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(204).end();
  },
};
