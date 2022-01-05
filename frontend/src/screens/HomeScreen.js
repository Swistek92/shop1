import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
// import products from '../products'

import Product from '../components/Product.js';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1> special price for you my dear customer!</h1>
      <h1> Very Cheap ! Very Cheap!</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <h3> {products.name}</h3>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
