const { addStudent, getAllStudents } = require('../models/studentModel');

// Controller to handle adding a student
async function createStudent(req, res, io) {
    const { name, email, courseId } = req.body; // Extract data from the request body

    try {
        // Validate input
        if (!name || !email || !courseId) {
            return res.render('pages/students/studentAdd', {
                message: 'All fields are required.',
                student: null,
            });
        }

        // Call the model function to add the student
        const newStudent = await addStudent({ name, email, courseId });

        // Render the response to the client after the event is emitted
        return res.render('pages/students/studentAdd', {
            message: 'Student added successfully!',
            student: newStudent,
        });
    } catch (error) {
        console.error('Error in createStudent:', error);

        // Render an error message if something goes wrong
        return res.render('pages/students/studentAdd', {
            message: 'Error adding student. Please try again.',
            student: null,
        });
    }
}

// Controller to handle fetching all students
async function fetchAllStudents(req, res) {
    try {
        // Fetch all students from the database
        const students = await getAllStudents();

        // Render the list of students
        return res.render('pages/students/studentList', { students });
    } catch (error) {
        console.error('Error in fetchAllStudents:', error);

        // Send a generic error response for failures
        return res.status(500).render('pages/students/studentList', {
            message: 'Error fetching students. Please try again.',
            students: [],
        });
    }
}

module.exports = { createStudent, fetchAllStudents };