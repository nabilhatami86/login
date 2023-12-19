// controllers/profileController.js
const userModel = require('../models/user');

exports.getUserProfile = (req, res) => {
  const userId = req.users.userId;

  userModel.getUser(userId, (error, user) => {
    if (error) {
      console.error('Error retrieving user:', error);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    // Remove sensitive information like password before sending the response
    const { password, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });
  });
};

exports.addProfilePicture = (req, res) => {

  const { imageUrl } = req.body;
  const userId = req.users.userId

  userModel.updateUser(userId, { profilePicture: imageUrl }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    res.json({ error: false, message: 'Profile picture added successfully' });
  });
};

exports.updateProfile = (req, res) => {
  const userId = req.users.userId;
  const { name, email, gender, birthdate } = req.body;

  userModel.updateUserProfile(userId, { name, email, gender, birthdate }, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }

    res.json({ error: false, message: 'Profile updated successfully' });
  });
};