const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Middleware to log requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`);
//   next();
// });

// Use the weather routes
app.use('/api', require('./routes/weatherRoutes'));

// Simple route for testing server status
app.get('/', (req, res) => {
  res.send('Weather API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
