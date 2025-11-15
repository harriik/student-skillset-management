const mongoose = require('mongoose');

// Student Schema
const studentSchema = new mongoose.Schema({
  rollNumber: {
    type: Number,
    required: [true, 'Roll number is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return Number.isInteger(v) && v > 0;
      },
      message: 'Roll number must be a positive integer'
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  guardianPhone: {
    type: String,
    default: null,
    validate: {
      validator: function(v) {
        // Indian mobile number format: 10 digits starting with 6-9
        if (!v || v === null || v === '') return true; // Optional field
        return /^[6-9]\d{9}$/.test(v);
      },
      message: 'Phone number must be a valid 10-digit Indian mobile number'
    }
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        const allowedSkills = ['dance', 'drawing', 'painting', 'singing', 'storyWriting', 'chess', 'cricket', 'soccer', 'orchestra'];
        if (!Array.isArray(v) || v.length === 0) return false;
        return v.every(skill => allowedSkills.includes(skill));
      },
      message: 'Skills must be selected from the allowed list'
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
studentSchema.index({ rollNumber: 1 });
studentSchema.index({ skills: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;


