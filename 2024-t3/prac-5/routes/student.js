const express = require('express');
const { createStudent, fetchAllStudents } = require('../controllers/studentController'); // Import controller
const router = express.Router();

// Route to show the student add form (GET request)
router.get('/add-form', (req, res) => {
    res.render('pages/students/studentAdd', { message: null, student: null });  // Render the form view
});

// Route to add a new student
router.post('/add', createStudent);

// Route to get all students
router.get('/', fetchAllStudents);

module.exports = router;