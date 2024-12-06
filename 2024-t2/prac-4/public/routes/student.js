const express = require('express');
const { addStudent, getAllStudents } = require('../../models/studentModel');  // Import student model
const router = express.Router();

// Route to add a new student
router.post('/add', async (req, res) => {
    const { name, email, courseId } = req.body;  // Get student data from the request body
    try {
        const newStudent = await addStudent({ name, email, courseId });  // Add student to DB
        res.status(201).send({ message: 'Student added successfully!', student: newStudent });
    } catch (error) {
        res.status(500).send('Error adding student');
    }
});

// Route to get all students
router.get('/', async (req, res) => {
    try {
        const students = await getAllStudents();  // Fetch students from DB
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send('Error fetching students');
    }
});

module.exports = router;
