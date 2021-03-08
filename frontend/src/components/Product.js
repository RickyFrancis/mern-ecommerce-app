import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../components/Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Link to={`/product/${product._id}`}>
        <Card.Title as="div" className="my-3">
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>

      <Card.Text as="div">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>
      <Card.Text as="h3">
        <div className="my-3">${product.price}</div>
      </Card.Text>
    </Card>
  );
};

export default Product;
