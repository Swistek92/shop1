import { response } from 'express';
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

//@desc Delete a product
//@route Delete / api/products/:id
//@acess Private/ admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc Create a product
//@route POST / api/products/
//@acess Private/ admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});

//@desc update a product
//@route PUT / api/products/:id
//@acess Private/ admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

export {
  getProducts,
  getProductByID,
  deleteProduct,
  updateProduct,
  createProduct,
};
