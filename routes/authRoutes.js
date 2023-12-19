// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/user/:id', authController.getUserById);
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
