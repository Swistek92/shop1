// import React from 'react'
// import { Link, useParams, Redirect } from 'react-router-dom'

import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductsDetails } from '../actions/productActions';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
// import products from '../products'
// import Product from '../components/Product';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const params = useParams();
  // const product = products.find((p) => p._id === params.id);

  useEffect(() => {
    dispatch(listProductsDetails(params.id));
  }, [dispatch, params.id]);

  const addToCardHandler = () => {
    navigate(`../cart/${params.id}?qty=${qty}`);
  };
  return (
    <div>
      <Link to='/' className='btn btn-dark my-3'>
        go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3> {product.name}</h3>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup>

            <ListGroup>
              <ListGroup.Item>
                <h3>Price: $ {product.price} </h3>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              <ListGroup.Item>
                <p>description: {product.description} $ </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong> {product.price}$</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <p>
                        {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                      </p>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col> Qty</Col>
                      <Col>
                        <FormControl
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup>
                  <Button
                    onClick={addToCardHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    <p> Add to cart</p>
                  </Button>
                </ListGroup>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductScreen;
