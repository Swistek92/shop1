// import React from 'react'
// import { Link, useParams, Redirect } from 'react-router-dom'


import React, {useState, useEffect} from 'react'
import { useParams, Link, Redirect } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
// import products from '../products'
// import Product from '../components/Product';
import axios from 'axios'



const ProductScreen = () => {
  const params = useParams();
  // const product = products.find((p) => p._id === params.id);

const [product, setProduct]= useState({})

  useEffect(()=>{
    const fetchProducts = async()=>{
      const {data} = await axios.get(`/api/products/${params.id}`)
      setProduct(data)
    }
    fetchProducts()
  }, [params.id])
  return (
    <div>
      <Link to='/'className='btn btn-dark my-3'>
        go back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                  <h3> {product.name}</h3>
              </ListGroup.Item>
          </ListGroup>
          <ListGroup>
              <Rating value={product.rating}text={`${product.numReviews} reviews`}/>
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
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                            Price:
                        </Col>
                        <Col>
                          <strong> {product.price}$</strong>
                        </Col>

                      </Row>
                    </ListGroup.Item> 

                    <ListGroup.Item>
                      <Row>
                        <Col>
                            Status:
                        </Col>
                        <Col>
                          <p>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</p>
                        </Col>

                      </Row>
                    </ListGroup.Item> 

                    <ListGroup>
                        <Button className='btn-block' type='button' disabled={product.countInStock === 0 }>
                           <p> Add to cart</p>
                        </Button>

                    </ListGroup>

                </ListGroup>
            </Card>
        </Col>


      </Row>

    </div>
  )
}

export default ProductScreen
