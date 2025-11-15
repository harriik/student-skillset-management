const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET / - Home page
router.get('/', (req, res) => {
  res.render('home', { title: 'Student Skillset Manager - Home' });
});

// GET /addStudent - Form to add a student
router.get('/addStudent', (req, res) => {
  res.render('addStudent', { 
    title: 'Add Student',
    error: null,
    success: null
  });
});

// POST /addStudent - Insert student into DB
router.post('/addStudent', async (req, res) => {
  try {
    const { rollNumber, name, guardianPhone, skills } = req.body;
    
    // Convert rollNumber to number
    const rollNum = parseInt(rollNumber);
    
    // Handle skills - can be string or array
    let skillsArray = [];
    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === 'string') {
      skillsArray = [skills];
    }
    
    // Handle guardianPhone - empty string becomes null
    const phone = guardianPhone && guardianPhone.trim() !== '' ? guardianPhone.trim() : null;
    
    // Create new student
    const student = new Student({
      rollNumber: rollNum,
      name: name.trim(),
      guardianPhone: phone,
      skills: skillsArray
    });
    
    await student.save();
    
    res.render('addStudent', {
      title: 'Add Student',
      error: null,
      success: `Student with roll number ${rollNum} added successfully!`
    });
  } catch (error) {
    let errorMessage = 'Failed to add student. ';
    if (error.code === 11000) {
      errorMessage += 'Roll number already exists!';
    } else if (error.errors) {
      errorMessage += Object.values(error.errors).map(e => e.message).join(', ');
    } else {
      errorMessage += error.message;
    }
    
    res.render('addStudent', {
      title: 'Add Student',
      error: errorMessage,
      success: null
    });
  }
});

// GET /deleteStudent - Page with roll number input
router.get('/deleteStudent', (req, res) => {
  res.render('deleteStudent', {
    title: 'Delete Student',
    error: null,
    success: null
  });
});

// POST /deleteStudent - Delete by roll number
router.post('/deleteStudent', async (req, res) => {
  try {
    const { rollNumber } = req.body;
    const rollNum = parseInt(rollNumber);
    
    const student = await Student.findOneAndDelete({ rollNumber: rollNum });
    
    if (!student) {
      return res.render('deleteStudent', {
        title: 'Delete Student',
        error: `Student with roll number ${rollNum} not found!`,
        success: null
      });
    }
    
    res.render('deleteStudent', {
      title: 'Delete Student',
      error: null,
      success: `Student with roll number ${rollNum} deleted successfully!`
    });
  } catch (error) {
    res.render('deleteStudent', {
      title: 'Delete Student',
      error: 'Failed to delete student: ' + error.message,
      success: null
    });
  }
});

// GET /updateStudent - Page to update skillset by roll number
router.get('/updateStudent', (req, res) => {
  res.render('updateStudent', {
    title: 'Update Student Skills',
    error: null,
    success: null,
    student: null
  });
});

// POST /updateStudent - Update skills
router.post('/updateStudent', async (req, res) => {
  try {
    const { rollNumber, skills } = req.body;
    const rollNum = parseInt(rollNumber);
    
    // Handle skills - can be string or array
    let skillsArray = [];
    if (Array.isArray(skills)) {
      skillsArray = skills;
    } else if (typeof skills === 'string') {
      skillsArray = [skills];
    }
    
    const student = await Student.findOneAndUpdate(
      { rollNumber: rollNum },
      { skills: skillsArray },
      { new: true, runValidators: true }
    );
    
    if (!student) {
      return res.render('updateStudent', {
        title: 'Update Student Skills',
        error: `Student with roll number ${rollNum} not found!`,
        success: null,
        student: null
      });
    }
    
    res.render('updateStudent', {
      title: 'Update Student Skills',
      error: null,
      success: `Skills updated successfully for roll number ${rollNum}!`,
      student: student
    });
  } catch (error) {
    let errorMessage = 'Failed to update student. ';
    if (error.errors) {
      errorMessage += Object.values(error.errors).map(e => e.message).join(', ');
    } else {
      errorMessage += error.message;
    }
    
    res.render('updateStudent', {
      title: 'Update Student Skills',
      error: errorMessage,
      success: null,
      student: null
    });
  }
});

// GET /displayStudent - Display student by roll number
router.get('/displayStudent', async (req, res) => {
  try {
    const { rollNumber } = req.query;
    
    if (!rollNumber) {
      return res.render('displayStudent', {
        title: 'Display Student',
        student: null,
        error: null
      });
    }
    
    const rollNum = parseInt(rollNumber);
    const student = await Student.findOne({ rollNumber: rollNum });
    
    if (!student) {
      return res.render('displayStudent', {
        title: 'Display Student',
        student: null,
        error: `Student with roll number ${rollNum} not found!`
      });
    }
    
    res.render('displayStudent', {
      title: 'Display Student',
      student: student,
      error: null
    });
  } catch (error) {
    res.render('displayStudent', {
      title: 'Display Student',
      student: null,
      error: 'Error: ' + error.message
    });
  }
});

// GET /skillStudent - Search page for skill (pattern search)
router.get('/skillStudent', (req, res) => {
  res.render('skillStudent', {
    title: 'Search by Skill',
    students: null,
    searchTerm: null,
    error: null
  });
});

// POST /skillStudent - Show all students having a skill (regex based)
router.post('/skillStudent', async (req, res) => {
  try {
    const { skillPattern } = req.body;
    
    if (!skillPattern || skillPattern.trim() === '') {
      return res.render('skillStudent', {
        title: 'Search by Skill',
        students: null,
        searchTerm: null,
        error: 'Please enter a skill pattern to search'
      });
    }
    
    // Create regex pattern for case-insensitive partial matching
    const regexPattern = new RegExp(skillPattern.trim(), 'i');
    
    // Find all students whose skills array contains a skill matching the pattern
    const students = await Student.find({
      skills: { $regex: regexPattern }
    }).sort({ rollNumber: 1 });
    
    res.render('skillStudent', {
      title: 'Search by Skill',
      students: students,
      searchTerm: skillPattern.trim(),
      error: null
    });
  } catch (error) {
    res.render('skillStudent', {
      title: 'Search by Skill',
      students: null,
      searchTerm: null,
      error: 'Error searching: ' + error.message
    });
  }
});

// GET /displayAll - Display all day scholars (guardianPhone = null)
router.get('/displayAll', async (req, res) => {
  try {
    const students = await Student.find({ guardianPhone: null })
      .sort({ rollNumber: 1 });
    
    res.render('displayAll', {
      title: 'Day Scholars (No Guardian Phone)',
      students: students,
      error: null
    });
  } catch (error) {
    res.render('displayAll', {
      title: 'Day Scholars (No Guardian Phone)',
      students: [],
      error: 'Error fetching students: ' + error.message
    });
  }
});

module.exports = router;


