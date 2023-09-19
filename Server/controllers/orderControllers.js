const server = require('./../server.js');


// Retrieve all orders for a user
const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;  // Assuming you have user info in req.user
        const orders = await db.query('SELECT * FROM orders WHERE userId = $1', [userId]);
        res.json(orders.rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Retrieve a specific order by ID for a user
const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.orderId;
        const order = await db.query('SELECT * FROM orders WHERE id = $1 AND userId = $2', [orderId, userId]);
        if (order.rows.length) {
            res.json(order.rows[0]);
        } else {
            res.status(404).json({ error: 'Order not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    getOrders,
    getOrderById
};
