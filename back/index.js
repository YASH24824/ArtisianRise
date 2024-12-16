const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path module
const route = require("./routes/route");

// Initialize the app
const app = express();
const port =process.env.port || 4000;

app.use(cors());
app.use(express.json()); // Use express's built-in body parser for JSON
app.use(express.urlencoded({ extended: true })); // Use express's built-in body parser for URL-encoded data

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/sellers', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB seller connected'))
  .catch((err) => console.error(err));
  const buyerConnection = mongoose.createConnection('mongodb://localhost:27017/buyers', { useNewUrlParser: true, useUnifiedTopology: true })

// Serve images from uploads directory
app.use('/upload', express.static(path.join(__dirname, 'upload'))); // Serve static files (uploaded images)

// Use routes
app.use('/', route);

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
