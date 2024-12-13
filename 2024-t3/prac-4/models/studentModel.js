const { connectToDB } = require('../connectDb'); // Import DB connection

async function addStudent(studentData) {
    try {
        const db = await connectToDB(); // Connect to DB
        const studentsCollection = db.collection('students');
        const result = await studentsCollection.insertOne(studentData);  // Insert new student
        
        // Instead of accessing ops[0], we directly return the inserted document
        return result.insertedId ? { ...studentData, _id: result.insertedId } : null;
    } catch (error) {
        console.error('Error adding student:', error);
        throw error;
    }
}

async function getAllStudents() {
    try {
        const db = await connectToDB();
        const studentsCollection = db.collection('students');
        return await studentsCollection.find().toArray();  // Get all students
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

module.exports = { addStudent, getAllStudents };
