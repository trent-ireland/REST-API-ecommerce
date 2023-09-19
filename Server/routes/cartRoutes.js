const express = require('express');
const {
    createCart,
    addToCart,
    getCartById,
    checkout
} = require('../controllers/cartController');

const router = express.Router();

// Create a new cart for a user
router.post('/cart', createCart);

// Add a product to a specific cart
router.post('/cart/:cartId', addToCart);

// Retrieve products in a specific cart
router.get('/cart/:cartId', getCartById);

// Handle the checkout process
router.post('/cart/:cartId/checkout', checkout);

module.exports = router;
