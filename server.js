const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// TEMP TEST LOGIN - Replace with your MongoDB logic later
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body || {};

    // TEMP TEST LOGIN
    if (email === "admin@test.com" && password === "123456") {
      return res.status(200).json({
        success: true,
        user: {
          name: "Admin",
          role: "admin",
          email: "admin@test.com",
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});