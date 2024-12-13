const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const studentRoutes = require('./public/routes/student');  // Import student routes
const { connectToDB } = require('./connectDb'); // Import DB connection

dotenv.config();

const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use student routes
app.use('/student', studentRoutes);

// Catch-all route for undefined routes (Optional, you may remove this if you don't want it)
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Set up the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
