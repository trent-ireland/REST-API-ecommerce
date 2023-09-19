const server = require('./../server.js');



// Retrieve all products or by category
const getProducts = async (req, res) => {
    try {
        let products;
        if (req.query.category) {
            products = await db.query('SELECT * FROM products WHERE category = $1', [req.query.category]);
        } else {
            products = await db.query('SELECT * FROM products');
        }
        res.json(products.rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Retrieve a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await db.query('SELECT * FROM products WHERE id = $1', [req.params.productId]);
        if (product.rows.length) {
            res.json(product.rows[0]);
        } else {
            res.status(404).json({ error: 'Product not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    getProducts,
    getProductById
};
