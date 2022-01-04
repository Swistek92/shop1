import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap';
import { addToCart } from '../actions/cartActions';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
const CartScreen = () => {
  const params = useParams();
  const productId = params.id;

  return (
    <div>
      <p>Cart </p>
    </div>
  );
};

export default CartScreen;
