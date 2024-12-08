require('dotenv').config();  // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');
const limiter = require('./middleware/rateLimiter');

const app = express();

// Access environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URI = process.env.REDIS_URI;

// Middleware setup
app.use(express.json());  // To parse JSON bodies
app.use(limiter);  // Apply rate limiter globally

// MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Redis Connection
const redisClient = redis.createClient({ url: REDIS_URI });
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.log('Error connecting to Redis:', err));

// Define routes (Example)
app.use('/api/tickets', require('./routes/ticketRoutes'));  // Example route
app.use('/api/users', require('./routes/userRoutes'));  // Example route

// Protected route example
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

// Global Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
