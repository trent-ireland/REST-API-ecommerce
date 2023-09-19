const express = require('express');
const {
    registerUser,
    getUsers,
    getUserById,
    updateUserById,
    loginUser
} = require('../controllers/userController');

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route (assuming you have a login function in your controller)
// router.post('/login', loginUser);

// CRUD routes for users
router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.put('/users/:userId', updateUserById);
router.post('/login', loginUser);

module.exports = router;
