const express = require('express');
const {
    getOrders,
    getOrderById
} = require('../controllers/orderControllers');

const router = express.Router();

router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrderById);

module.exports = router;
