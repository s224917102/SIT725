require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;  // Mongo URI from the .env file

async function connectToDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db('courseDB');  // Access the 'courseDB' database

        console.log('Connected to MongoDB!');
        return db;  // Return the database instance
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;  // Propagate the error for handling in the routes
    }
}

module.exports = { connectToDB };
