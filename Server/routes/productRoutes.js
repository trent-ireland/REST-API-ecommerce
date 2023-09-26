const express = require('express');
const { getProducts, getProductById } = require('./../controllers/productControllers');

const router = express.Router();

router.get('/', getProducts);
router.get('/:productId', getProductById);

module.exports = router;
