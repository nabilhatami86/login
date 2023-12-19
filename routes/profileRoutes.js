// routes/profileRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const profileController = require('../controllers/profileController');


const router = express.Router();

router.get('/profile', profileController.getUserProfile);
router.post('/add-profile-picture',authMiddleware, profileController.addProfilePicture);
router.put('/update-profile', authMiddleware, profileController.updateProfile);

module.exports = router;
