const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

// Controller methods for authentication
const register = async (req, res) => {
    const { username, email, password, salesTargets } = req.body;

    try {
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            username,
            email,
            password,
            salesTargets
        });

        await user.save();

        // Create JWT payload
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        };

        // Sign token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        logger.error('Registration error', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
}

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        };

        // Sign token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '7d' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        logger.error('Login error', err);
        res.status(500).json({ message: 'Server error during login' });
    }
}
module.exports = {
    register,
    login
};