const db = require('../config/db');

const createUserTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profilePicture VARCHAR(255),
    gender VARCHAR(10),
    birthdate DATE
  )
`;

db.query(createUserTable, (err) => {
  if (err) throw err;
  console.log('User table created or exists');
});

module.exports = {
  createUser: (userData, callback) => {
    const { name, email, password } = userData;
    const insertUserQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(insertUserQuery, [name, email, password], callback);
  },

  findUserByEmail: (email, callback) => {
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(getUserQuery, [email], (err, results) => {
      if (err) throw err;
      callback(null, results[0]);
    });
  },

  getUser: (userId, callback) => {
    const getUserQuery = 'SELECT * FROM users WHERE id = ?';
    db.query(getUserQuery, [userId], (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        // No user found with the given ID
        return callback(null, null);
      }

      const user = results[0];
      callback(null, user);
    });
  },

  updateUser: (userId, userData, callback) => {
    const { profilePicture } = userData;
    const updateQuery = 'UPDATE users SET profilePicture = ? WHERE id = ?';
    db.query(updateQuery, [profilePicture, userId], callback);
  },

  updateUserProfile: (userId, userData, callback) => {
    const { name, email, gender, birthdate } = userData;
    const updateProfileQuery = 'UPDATE users SET name = ?, email = ?, gender = ?, birthdate = ? WHERE id = ?';
    db.query(updateProfileQuery, [name, email, gender, birthdate, userId], callback);
  },
};
