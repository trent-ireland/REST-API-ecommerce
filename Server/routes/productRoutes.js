const express = require('express');
const { getProducts, getProductById } = require('../controllers/productControllers');


const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:productId', getProductById);

module.exports = router;
