const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const db = require('./db'); // Importing the database connection pool
const dotenv = require('dotenv'); // For environment variables
const cors = require('cors'); // For handling CORS

dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS for all routes

// Express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Use environment variable or a default value
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

db.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to the database.');
    release(); // Release the client back to the pool
  }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
