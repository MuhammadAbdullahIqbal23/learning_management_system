const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy login credentials
const validCredentials = {
  username: 'admin',
  password: 'admin123',
};

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === validCredentials.username && password === validCredentials.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
