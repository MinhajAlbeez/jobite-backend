// controllers/userController.js
const User = require('../models/Users'); // Ensure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password, role } = req.body; // Ensure 'role' is destructured here
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || 'seeker' // If role is not provided, default to 'seeker'
        });
        res.status(201).json({ message: "User created", userId: newUser._id, role: newUser.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate access and refresh tokens
//         const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

//         // Store refresh token in user document
//         user.refreshToken = refreshToken;
//         await user.save();

//         // Log the tokens for debugging
//         console.log('Access Token:', accessToken);
//         console.log('Refresh Token:', refreshToken);

//         // Set access token in the response header
//         res.setHeader('Authorization', `Bearer ${accessToken}`);

//         // Send refresh token in the response body
//         res.json({ refreshToken });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate access and refresh tokens
        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Store refresh token in user document
        user.refreshToken = refreshToken;
        await user.save();

        // Log the tokens for debugging
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        // Set access token in the response header
        res.setHeader('Authorization', `Bearer ${accessToken}`);

        // Send both tokens in the response body
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




exports.refreshToken = async (req, res) => {
    const { token } = req.body; // Get the refresh token from the request body

    if (!token) {
        return res.status(401).json({ message: "Refresh token is required" });
    }

    try {
        const user = await User.findOne({ refreshToken: token }); // Find user by refresh token
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Verify the refresh token
        jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            // Generate a new access token
            const newAccessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

            // Send the new access token in the Authorization header
            res.setHeader('Authorization', `Bearer ${newAccessToken}`);
            res.json({ message: 'Token refreshed' });
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
        const user = await User.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        user.refreshToken = null;
        await user.save();

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
