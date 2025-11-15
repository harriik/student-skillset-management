# Student Skillset Manager

A complete Node.js, Express.js, and MongoDB application for managing student skillset details.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Templating**: EJS
- **Styling**: Bootstrap 5
- **Validation**: HTML5 patterns + JavaScript RegEx

## Features

- ✅ Add new students with skills
- ✅ Display student by roll number
- ✅ Update student skills
- ✅ Delete student by roll number
- ✅ Search students by skill (pattern-based regex search)
- ✅ Display all day scholars (students without guardian phone)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your system (default: `mongodb://localhost:27017`)

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Environment Variables

You can set the MongoDB connection URI using an environment variable:
```bash
MONGODB_URI=mongodb://localhost:27017/studentSkillsetDB
```

## Student Model

Each student record contains:
- **rollNumber**: Number (unique, required, positive integer)
- **name**: String (required, 2-100 characters, letters and spaces only)
- **guardianPhone**: String (optional, 10-digit Indian mobile number starting with 6-9)
- **skills**: Array of strings (required, at least one skill)

### Allowed Skills

- dance
- drawing
- painting
- singing
- storyWriting
- chess
- cricket
- soccer
- orchestra

## Routes

- `GET /` - Home page
- `GET /addStudent` - Form to add a student
- `POST /addStudent` - Insert student into DB
- `GET /deleteStudent` - Page with roll number input
- `POST /deleteStudent` - Delete by roll number
- `GET /updateStudent` - Page to update skillset by roll number
- `POST /updateStudent` - Update skills
- `GET /displayStudent` - Display student by roll number
- `GET /skillStudent` - Search page for skill (pattern search)
- `POST /skillStudent` - Show all students having a skill (regex based)
- `GET /displayAll` - Display all day scholars (guardianPhone = null)

## Validation

- **Roll Number**: Positive integer validation
- **Name**: 2-100 characters, letters and spaces only
- **Phone**: 10-digit Indian mobile format (6-9XXXXXXXXX)
- **Skills**: At least one skill must be selected
- **Pattern Search**: Uses JavaScript RegEx for flexible skill matching (e.g., "sing" matches "singing")

## Project Structure

```
project/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── routes/
│   └── studentRoutes.js     # All route handlers
├── models/
│   └── Student.js           # Mongoose schema
├── views/                    # EJS templates
│   ├── home.ejs
│   ├── addStudent.ejs
│   ├── deleteStudent.ejs
│   ├── updateStudent.ejs
│   ├── displayStudent.ejs
│   ├── skillStudent.ejs
│   ├── displayAll.ejs
│   └── error.ejs
└── public/
    ├── css/
    │   └── style.css        # Custom styles
    ├── images/
    │   └── favicon.svg      # Favicon
    └── scripts/
        └── validation.js    # Client-side validation
```

## Notes

- The application uses pattern-based search for skills. For example, searching "sing" will match "singing".
- Day scholars are students with `guardianPhone = null`.
- All forms include both client-side and server-side validation.


