# How to Run the Student Skillset Manager Application

## Prerequisites

Before running the application, make sure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (Community Edition)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Step-by-Step Instructions

### Option 1: Using Local MongoDB

#### Step 1: Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- ejs
- body-parser
- nodemon (for development)

#### Step 2: Start MongoDB

**On Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or start it manually:
mongod
```

**On macOS/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# Or if installed via Homebrew:
brew services start mongodb-community
```

**Verify MongoDB is running:**
- Default port: `27017`
- You can check by visiting: `http://localhost:27017` (should show "It looks like you are trying to access MongoDB over HTTP")

#### Step 3: Run the Application

**For Production:**
```bash
npm start
```

**For Development (with auto-reload):**
```bash
npm run dev
```

#### Step 4: Access the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the home page of the Student Skillset Manager!

---

### Option 2: Using MongoDB Atlas (Cloud)

#### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a free cluster (M0 Sandbox)
4. Create a database user
5. Whitelist your IP address (or use `0.0.0.0/0` for all IPs)
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

#### Step 2: Set Environment Variable

**On Windows (PowerShell):**
```powershell
$env:MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/studentSkillsetDB"
```

**On Windows (Command Prompt):**
```cmd
set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentSkillsetDB
```

**On macOS/Linux:**
```bash
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/studentSkillsetDB"
```

**Or create a `.env` file** (recommended):
Create a file named `.env` in the project root:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studentSkillsetDB
```

Then install `dotenv` package:
```bash
npm install dotenv
```

And update `server.js` to load it:
```javascript
require('dotenv').config();
```

#### Step 3: Install Dependencies

```bash
npm install
```

#### Step 4: Run the Application

```bash
npm start
```

#### Step 5: Access the Application

Open your browser:
```
http://localhost:3000
```

---

## Quick Start (All-in-One)

If you have Node.js and MongoDB installed locally:

```bash
# 1. Install dependencies
npm install

# 2. Make sure MongoDB is running (check with mongod command)

# 3. Start the application
npm start

# 4. Open browser to http://localhost:3000
```

---

## Troubleshooting

### Error: "Cannot find module 'express'"
**Solution:** Run `npm install` to install all dependencies.

### Error: "MongoDB connection error"
**Solutions:**
1. Make sure MongoDB is running:
   - Windows: Check Services (services.msc) for MongoDB
   - macOS/Linux: `sudo systemctl status mongod`
2. Check if MongoDB is on the default port (27017)
3. If using Atlas, verify your connection string and IP whitelist

### Error: "Port 3000 already in use"
**Solutions:**
1. Change the port in `server.js`:
   ```javascript
   const PORT = process.env.PORT || 3001; // Change to 3001 or any available port
   ```
2. Or stop the process using port 3000:
   - Windows: `netstat -ano | findstr :3000` then `taskkill /PID <pid> /F`
   - macOS/Linux: `lsof -ti:3000 | xargs kill`

### Error: "EADDRINUSE: address already in use"
**Solution:** Another application is using port 3000. Use a different port or stop the conflicting application.

### MongoDB Connection String Format
- Local: `mongodb://localhost:27017/studentSkillsetDB`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/studentSkillsetDB`

---

## Testing the Application

Once running, try these actions:

1. **Add a Student:**
   - Go to "Add Student"
   - Fill in roll number, name, phone (optional), and select skills
   - Submit the form

2. **Display Student:**
   - Go to "Display Student"
   - Enter a roll number
   - View student details

3. **Search by Skill:**
   - Go to "Search by Skill"
   - Enter "sing" (will match "singing")
   - See all students with matching skills

4. **View Day Scholars:**
   - Go to "Day Scholars"
   - See all students without guardian phone numbers

---

## Development Mode

For development with auto-reload on file changes:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you make changes.

---

## Project Structure

```
project/
├── server.js              # Main server file
├── package.json           # Dependencies
├── routes/                # Route handlers
├── models/                # Database models
├── views/                 # EJS templates
└── public/                # Static files (CSS, JS, images)
```

---

## Need Help?

- Check MongoDB logs if connection fails
- Verify all dependencies are installed: `npm list`
- Check Node.js version: `node --version` (should be 14+)
- Check MongoDB version: `mongod --version`


