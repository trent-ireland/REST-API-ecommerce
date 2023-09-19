const server = require('../server.js');

const db = server;  // Assuming that your server.js exports the database connection or pool

// Create a new cart for a user
const createCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const newCart = await db.query('INSERT INTO carts (userId) VALUES ($1) RETURNING *', [userId]);
        res.status(201).json(newCart.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Add a product to a specific cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cartId = req.params.cartId;
        const addedProduct = await db.query(
            'INSERT INTO carts (cartId, productId, quantity) VALUES ($1, $2, $3) RETURNING *',
            [cartId, productId, quantity]
        );
        res.status(201).json(addedProduct.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Retrieve products in a specific cart
const getCartById = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const cartItems = await db.query('SELECT * FROM carts WHERE id = $1', [cartId]);
        res.json(cartItems.rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Handle the checkout process
const checkout = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        // Your checkout logic here. This is a basic placeholder.
        // You'll need to implement the actual logic based on your application's requirements.
        // For instance, you might want to mark items in the cart as "purchased" or move them to an "orders" table.
        res.json({ message: 'Checkout successful for cart ' + cartId });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    createCart,
    addToCart,
    getCartById,
    checkout  // Exporting the new checkout function
};
