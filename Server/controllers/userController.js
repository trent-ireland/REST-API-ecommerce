const db = require('./../db');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    try {
        const newUser = await db.query(
            'INSERT INTO users (username, email, hashedPassword) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Login a user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Both email and password are required.' });
    }

    try {
        // Check if user exists
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const userRecord = user.rows[0];
        if (!userRecord.hashedpassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // Compare provided password with hashed password in the database
        const isMatch = await bcrypt.compare(password, userRecord.hashedpassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        // If passwords match, return the user (without the hashed password)
        const { hashedpassword, ...userWithoutPassword } = userRecord;
        res.json(userWithoutPassword);
    } catch (err) {
        console.error("Error during login:", err); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error.' });
    }
};


// Retrieve all users
const getUsers = async (req, res) => {
    try {
        const users = await db.query('SELECT * FROM users');
        res.json(users.rows);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Retrieve a specific user by ID
const getUserById = async (req, res) => {
    try {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.userId]);
        if (user.rows.length) {
            res.json(user.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// Update a specific user by ID
const updateUserById = async (req, res) => {
    try {
        const { username, email } = req.body;
        const updatedUser = await db.query(
            'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *',
            [username, email, req.params.userId]
        );
        if (updatedUser.rows.length) {
            res.json(updatedUser.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = {
    registerUser,
    loginUser, 
    getUsers,
    getUserById,
    updateUserById
};
