const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const studentRoutes = require('./routes/student');  // Import student routes
const { connectToDB } = require('./connectDb'); // Import DB connection

dotenv.config();

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Set views folder

// Connect to the database
connectToDB();  // Assuming connectToDB is a function that handles the database connection

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (like CSS, JS, and images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the home page (home.ejs)
app.get('/', (req, res) => {
    res.render('layouts/main');  // Render the home page inside the layout
});

// Use student routes
app.use('/student', studentRoutes);

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).render('pages/404');  // You can create a custom 404 page inside 'views/pages/404.ejs'
});

// Set up the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});


// Export the app object (do not call app.listen here)
module.exports = app;