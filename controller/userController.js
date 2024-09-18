// controllers/userController.js
const User = require('../models/Users');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch users from the database
    res.status(200).json(users); // Send the users as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users', error });
  }
};
