const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http'); // Required for Socket.IO
const { Server } = require('socket.io'); // Importing Socket.IO
const studentRoutes = require('./routes/student'); // Import student routes
const { connectToDB } = require('./connectDb'); // Import DB connection
const readline = require('readline'); // Import readline module

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server); // Initialize socket.io with the server

// Export the 'io' instance to use in other files
module.exports = io;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views folder

// Connect to the database
connectToDB(); // Assuming connectToDB is a function that handles the database connection

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (like CSS, JS, and images) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the home page (home.ejs)
app.get('/', (req, res) => {
    res.render('layouts/main'); // Render the home page inside the layout
});

// Use student routes
app.use('/student', studentRoutes);

// Catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).render('pages/404'); // Custom 404 page inside 'views/pages/404.ejs'
});

// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for chat messages
    socket.on('chatMessage', (message) => {
        console.log('Message received:', message);
        io.emit('message', `User: ${message}`); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});


// Function to send messages from the server
function sendMessageFromServer(message) {
    io.emit('message', `Server: ${message}`); // Broadcast the server message to all clients
    console.log(`Server message sent: ${message}`);
}

// Create a readline interface to capture input from terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt the user for input in the terminal
rl.on('line', (input) => {
    sendMessageFromServer(input); // Send the input message to all connected clients
});

// Set up the server
const port = process.env.PORT || 3000;
server.listen(port, () => { // Use server.listen instead of app.listen
    console.log(`Server is running on port ${port}...`);
});

module.exports = { app, server }; // Export both the app and server
