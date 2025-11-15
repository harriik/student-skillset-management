const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentSkillsetDB';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => {
  console.log('✅ Connected to MongoDB successfully');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('\n💡 Troubleshooting tips:');
  console.error('   1. Make sure MongoDB service is running: Get-Service MongoDB');
  console.error('   2. Check if MongoDB is accessible: Test-NetConnection localhost -Port 27017');
  console.error('   3. Try using 127.0.0.1 instead of localhost');
  console.error('   4. Or use MongoDB Atlas (cloud): Set MONGODB_URI environment variable');
  console.error('\n⚠️  Server will continue but database operations will fail.\n');
  // Don't exit - allow server to start but show warning
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    error: err.message || 'Something went wrong!',
    title: 'Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    error: 'Page not found',
    title: '404 - Not Found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


