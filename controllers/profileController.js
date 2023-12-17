// controllers/profileController.js
const userModel = require('../models/user');

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

// exports.updateProfile = (req, res) => {
//   const userId = req.userData.userId; 

//   console.log(userId)
//   const { name, email, gender, birthdate } = req.body;

//   const updatedProfile = {
//     name,
//     email,
//     gender,
//     birthdate,
//   };

//   userModel.updateUser(userId, updatedProfile, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: true, message: 'Internal Server Error' });
//     }

//     res.json({ error: false, message: 'Profile updated successfully' });
//   });
// };

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