const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();  // Ensure .env is loaded before using environment variables

const app = express();
app.use(express.json());

connectDB();

app.use('/api', require('./routes/postRoutes'));

module.exports = app;
