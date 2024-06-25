const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors= require('cors');

const app = express();
connectDB();

app.use(express.json());
// Enable CORS for all routes
app.use(cors());
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
