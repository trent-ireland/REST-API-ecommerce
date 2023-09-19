const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 5432;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/api/users', userRoutes);      // User routes are prefixed with /api/users
app.use('/api/products', productRoutes); // Product routes are prefixed with /api/products
app.use('/api/cart', cartRoutes);        // Cart routes are prefixed with /api/cart
app.use('/api/orders', orderRoutes);     // Order routes are prefixed with /api/orders

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
