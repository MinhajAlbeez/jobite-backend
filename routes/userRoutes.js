// routes/userRoutes.js
const express = require('express');
const { signup, login,refreshToken,logout } = require('../controller/userController');
const router = express.Router();
const refreshTokenMiddleware = require('../middlewares/refreshToken');

router.post('/signup', signup);
router.post('/login', login);
router.post('/refreshToken', refreshTokenMiddleware, async (req, res) => {
    const newAccessToken = generateAccessToken(req.user.id); 
    res.json({ accessToken: newAccessToken });
});
router.post('/logout', logout);


module.exports = router;
