const { addStudent, getAllStudents } = require('../models/studentModel'); // Import student model

// Controller to handle adding a student
// Controller to handle adding a student
async function createStudent(req, res) {
    const { name, email, courseId } = req.body; // Extract data from request
    try {
        // Call model method to add student
        const newStudent = await addStudent({ name, email, courseId });

        // If the student is successfully added, render the studentAdd page with a success message
        res.render('pages/students/studentAdd', {
            message: 'Student added successfully!',
            student: newStudent
        });
    } catch (error) {
        console.error('Error in createStudent:', error);
        
        // If an error occurs, render the studentAdd page with an error message
        res.render('pages/students/studentAdd', {
            message: 'Error adding student. Please try again.',
            student: null
        });
    }
}


// Controller to handle fetching all students
// In studentController.js
async function fetchAllStudents(req, res) {
    try {
        const students = await getAllStudents(); // Fetch all students from DB
        res.render('pages/students/studentList', { students: students }); // Render the EJS view with students data
    } catch (error) {
        console.error('Error in fetchAllStudents:', error);
        res.status(500).send('Error fetching students');
    }
}


module.exports = { createStudent, fetchAllStudents };