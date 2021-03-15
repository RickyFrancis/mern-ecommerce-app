// const express = require('express');
import express from 'express';
// const dotenv = require('dotenv');
import dotenv from 'dotenv';

import connectDB from './config/db.js';

// const products = require('./data/products');
// import products from './data/products.js';

import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
