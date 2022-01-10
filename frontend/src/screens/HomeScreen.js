import React, { useEffect } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
// import products from '../products'
import { useParams, Link } from 'react-router-dom';

import Product from '../components/Product.js';
import Message from '../components/Message.js';
import Loader from '../components/Loader.js';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions.js';
import Paginate from '../components/Paginate.js';
import ProductCarousel from '../components/ProductCarousel.js';
import Meta from '../components/Meta.js';
const HomeScreen = () => {
  const params = useParams();
  const keyword = params.keyword;
  // console.log(keyword);
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    window.scroll({ top: 0, left: 0 });
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta />

      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-dark'>
          {' '}
          go back
        </Link>
      )}
      <h1> Very Cheap ! Best Quality ! Special for you ! </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <h3> {products.name}</h3>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
