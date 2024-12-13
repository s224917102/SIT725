document.addEventListener('DOMContentLoaded', function () {
    // Initialize Materialize components
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);

    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdowns);
});

// Toggle Student Form
document.getElementById('toggleStudentForm').addEventListener('click', () => {
    const form = document.getElementById('studentFormContainer');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

// Student Form Submission
document.getElementById('student-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const courseId = document.getElementById('courseId').value;

    const response = await fetch('/student/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, courseId })
    });

    const data = await response.json();
    if (response.status === 201) {
        M.toast({ html: 'Student added successfully', classes: 'rounded green' });
    } else {
        M.toast({ html: 'Error adding student', classes: 'rounded red' });
    }
});