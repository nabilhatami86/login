// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes); 
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(
      "Wellcome To difa API Profile"
  )
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});