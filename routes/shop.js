// const path = require('path');

const express = require('express');

// const rootDir = require('../util/path');
// const adminData = require('./admin');

const controllerProduct = require('../controllers/product')

const router = express.Router();

router.get('/', controllerProduct.getProducts);

module.exports = router;
