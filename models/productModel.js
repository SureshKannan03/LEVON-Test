let products = [];
let nextId = 1;

const getAllProducts = () => products;

const getProductById = (id) => products.find((p) => p.id === id);

const createProduct = (product) => {
  const newProduct = { id: nextId++, ...product };
  products.push(newProduct);
  return newProduct;
};

const updateProductById = (id, updatedProduct) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    return products[index];
  }
  return null;
};

const deleteProductById = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
