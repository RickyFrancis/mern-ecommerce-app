import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
// import products from '../products';

const ProductScreen = ({ history, match }) => {
  // const product = products.find((product) => product._id === match.params.id);

  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${match.params.id}`);
  //     setProduct(data);
  //   };

  //   fetchProduct();
  // }, [match]);

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, error, product } = productDetails;

  const {
    name,
    rating,
    numReviews,
    price,
    description,
    image,
    countInStock,
  } = product;

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={image} alt={name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {rating && (
                  <Rating value={rating} text={`${numReviews} reviews`} />
                )}
              </ListGroup.Item>
              <ListGroup.Item>Price: ${price}</ListGroup.Item>
              <ListGroup.Item>Description: {description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {countInStock > 0
                        ? `${countInStock} In Stock`
                        : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    disabled={countInStock > 0 ? false : true}
                  >
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
