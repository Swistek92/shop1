import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

//@desc fetch all products
//@route GET / api/products
//@acess Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  // res.status(401);
  // throw new Error('not autorized');
  res.json(products);
});

//@desc fetch single  products
//@route GET / api/products/:id
//@acess Public

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductByID };