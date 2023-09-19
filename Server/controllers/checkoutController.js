const server = require('./../server.js');
// Handle checkout process
const checkout = async (req, res) => {
    const cartId = req.params.cartId;

    try {
        // Validate the cart
        const cart = await db.query('SELECT * FROM carts WHERE id = $1', [cartId]);
        if (!cart.rows.length) {
            return res.status(404).json({ error: 'Cart not found.' });
        }

        // For now, we'll assume the payment process is successful
        // In a real-world scenario, you'd integrate with a payment gateway here

        // Create an order to reflect the successful payment
        const order = await db.query(
            'INSERT INTO orders (userId, totalPrice, status) VALUES ($1, $2, $3) RETURNING *',
            [cart.rows[0].userId, /*totalPrice calculation*/, 'Success']
        );

        // Clear the cart after successful checkout
        await db.query('DELETE FROM carts WHERE id = $1', [cartId]);

        res.status(201).json({
            message: 'Checkout successful!',
            order: order.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    checkout
};
