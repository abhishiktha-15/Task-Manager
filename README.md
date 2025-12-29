# 🎯 TaskLoop - Task Management Application

A simple and beautiful task manager to organize your work. Create tasks, set priorities, search and filter them easily. Works on any device with Google login.

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.7-FFCA28?logo=firebase)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)
![Deployed](https://img.shields.io/badge/Status-Live-success?logo=vercel)

---

## 🎯 The Problem

Managing tasks can be difficult when you have too many things to do:
- 📋 Hard to know which tasks are most important
- 🔍 Can't find specific tasks quickly
- 📱 Need to access your tasks from different devices
- 🔐 Want to keep your personal data secure
- 🎨 Need a simple and pleasant interface

**TaskLoop** helps you organize your tasks with priorities, search through them easily, and access them from anywhere with Google login.

---

## 💡 What You Can Do

With TaskLoop, you can:
- ✅ Create tasks with titles, descriptions, and deadlines
- 🏷️ Set priority levels (High, Medium, Low) to know what's important
- 🔍 Search for tasks by typing keywords
- 📊 Filter tasks by status (Pending, In Progress, Completed) or priority
- 🌓 Switch between light and dark mode
- 📱 Use it on your phone, tablet, or computer
- 🔐 Login securely with your Google account

---

## 🛠️ Technologies Used

### Frontend (What You See)
- **React** - For building the user interface
- **Tailwind CSS** - For styling and colors
- **Framer Motion** - For smooth animations
- **Firebase** - For Google login

### Backend (Server)
- **Node.js & Express** - Server to handle requests
- **Firebase** - Database to store your tasks
- **JWT** - To keep you logged in securely

### Hosting
- **Vercel** - Hosts the website (frontend)
- **Render** - Hosts the server (backend)

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     USER INTERACTION                          │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (Vercel)                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Components: Dashboard, CreateTask, EditTask, Login    │  │
│  │  Features: Search, Filter, Sort, Dark Mode             │  │
│  │  State: React Hooks + localStorage                     │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
       How It Works

```
┌─────────────────────┐
│   You (Browser)     │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│   React Website     │ ──Login with Google──► Firebase
│   (Vercel)          │
└─────────────────────┘
          │
          │ Create/Edit/Delete Tasks
          ▼
┌─────────────────────┐
│   Express Server    │
│   (Render)          │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│   Firebase Database │ (Stores your tasks)
└─────────────────────┘
```

**Simple Flow:**
1. You login with Google
2. Create or view your tasks
3. Server saves them to the database
4. Your tasks are available on any device

---

## 📁 Project Files

```
Task 3/
├── 📂 server/                    # Backend code
│   ├── config/                   # Firebase setup
│   ├── controllers/              # Logic for login and tasks
│   ├── routes/                   # API endpoints
│   ├── middleware/               # Security checks
│   └── server.js                 # Main server file
│
└── 📂 client/                    # Frontend code
    ├── src/
    │   ├── components/           # Reusable parts (Navbar, TaskCard)
    │   ├── pages/                # Main pages (Login, Dashboard, etc.)
    │   ├── services/             # API connection
    │   └── firebase.js           # Firebase config
    │
    └── package.json              # Dependencies
```

---

## ✨ Main Features

### Prerequisites

Before you begin, ensure you have:
- ✅ **Node.js** v16 or higher ([Download](https://nodejs.org))
- ✅ **npm** or **yarn** package manager
- ✅ **Git** for version control
- ✅ **Firebase Account** ([Create Free Account](https://firebase.google.com))
- ✅ **Code Editor** (VS Code recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/abhishiktha-15/Task-Manager.git
cd "Task 3"
```

### Step 2: Firebase Project Setup

#### A. Create Firebase Project
1. Navigate to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name (e.g., "TaskLoop")
4. Enable/disable Google Analytics (optional)
5. Click **"Create project"**

#### B. Enable Google Authentication
1. In your Firebase project, go to **Authentication**
2. ClMain Features

### 1. 🎨 Priority Levels
- **High** 🔴 - Very important tasks
- **Medium** 🟡 - Moderately important
- **Low** 🟢 - Can wait
- Easy to see with colors

### 2. 🔍 Search and Filter
- Type to search in task titles or descriptions
- Filter by status (Pending, In Progress, Done)
- Filter by priority (High, Medium, Low)
- Sort tasks by deadline or when you created them

### 3. 📊 Dashboard
- See how many tasks you have
- Check pending, in-progress, and completed counts
- All your tasks in one place

### 4. 🌓 Dark Mode
- Switch between light and dark theme
- Easier on the eyes at night
- Your choice is remembered

### 5. 🔐 Secure Login
- Login with your Google account
- No need to create passwords
- Your data is private and secure
PORT=5000
NODE_ENV=development
FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json
JWT_SECRET=your_super_secret_jwt_key_here_change_this
```

**Important**: Change `JWT_SECRET` to a random string. Generate one:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the backend server:

```bash
npm run dev
```

✅ Server should be running at **http://localhost:5000**

### Step 4: Frontend Setup

Open a new terminal window:

```bash
cd client
npm install
```

Create `.env` file in `client/` directory using your Firebase config:

```env
# Firebase Configuration (from Step 2D)
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Backend API URL
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

✅ Frontend should be running at **http://localhost:5173**

### Step 5: Test the Application

1. Open browser to **http://localhost:5173**
2. Click **"Continue with Google"**
3. Sign in with your Google account
4. Create your first task!

---

## 🌐 Deployed Links

### 🚀 Live Application
**Frontend (Vercel)**: [https://ak-taskloop.vercel.app](https://ak-taskloop.vercel.app)

**Backend API (Render)**: [https://task-manager-ih6v.onrender.com](https://task-manager-ih6v.onrender.com)

### 📦 Repository
**GitHub**: [abhishiktha-15/Task-Manager](https://github.com/abhishiktha-15/Task-Manager)

### 🧪 Test the Live App
1. Visit the deployed frontend link
2. Sign in with any Google account
3. Create, edit, and manage tasks
4. Test filters, search, and dark mode
5. Tasks are stored in Cloud Firestore

**Note**: Backend on Render free tier may have cold starts (15-30s initial load)

---

## � Database Schema

### Firestore Collections

#### `users` Collection
Stores authenticated user information:

```javascript
{
  "uid": "firebase_user_id_123",           // Firebase UID (document ID)
  "name": "John Doe",                      // Display name from Google
  "email": "john.doe@example.com",         // User email
  "photo": "https://lh3.googleusercontent.com/...",  // Profile picture
  "createdAt": Timestamp,                  // Account creation
  "lastLogin": Timestamp                   // Last authentication
}
```

#### `tasks` Collection
Stores all user tasks:

```javascript
{
  "title": "Complete project documentation",        // Task title (required)
  "description": "Write comprehensive README...",   // Detailed description
  "status": "In Progress",                          // Pending | In Progress | Completed
  "priority": "High",                               // High | Medium | Low
  "deadline": "2025-01-15",                         // YYYY-MM-DD format
  "userId": "firebase_user_id_123",                 // Owner reference
  "createdAt": Timestamp,                           // Creation timestamp
  "updatedAt": Timestamp                            // Last modification
}
```

**Firestore Indexes**: Automatically created by Firebase for efficient querying by `userId`.

---

## 🔐 API Endpoints Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Request Body |
|--------|----------|-------------|---------------|--------------|
| `POST` | `/api/auth/google` | Verify Firebase ID token & create session | ❌ | `{ idToken: string }` |
| `GET` | `/api/auth/me` | Get current user details | ✅ | - |

**Example Request:**
```bash
curl -X POST https://task-manager-ih6v.onrender.com/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."}'
```

**Example Response:**
```json
{
  "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "uid": "abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "photo": "https://..."
  }
}
```Live Demo

### Try It Now! 🚀
**Website**: [https://ak-taskloop.vercel.app](https://ak-taskloop.vercel.app)

**Code**: [GitHub Repository](https://github.com/abhishiktha-15/Task-Manager)

Just click the link, login with Google, and start managing your tasks!

**Note**: First load might take 30 seconds (server wakes up
    "title": "Fix navigation bug",
    "description": "Update routing logic",
    "status": "Pending",
    "priority": "High",
    "deadline": "2025-01-20"
  }'
```

**Response:**
```json
{
  "id": "task123",
  "title": "Fix navigation bug",
  "status": "Pending",
  "priority": "High",
  "deadline": "2025-01-20",
  "userId": "user123",
  "createdAt": "2025-01-15T10:00:00.000Z",
  "updatedAt": "2025-01-15T10:00:00.000Z"
}
```

---

## 🎨 User Interface Guide

### 1. Login Page
- Clean, centered design with gradient background
- **"Continue with Google"** button with Google logo
- Firebase popup authentication
- Automatic redirect to Dashboard on success
- Error handling for failed login attempts

### 2. Dashboard (Main Interface)

**Top Section:**
- **Statistics Cards**: Display total, pending, in-progress, and completed task counts
- **Theme Toggle**: Switch between light and dark mode
- **Logout Button**: End session securely

**Filter Controls:**
- **Status Filter**: Buttons for All, Pending, In Progress, Completed
- **Priority Filter**: High 🔴, Medium 🟡, Low 🟢 with color coding
- **Search Bar**: Real-time search across titles and descriptions
- **Sort Dropdown**: By Deadline, Created Date, or Priority

**Task Display:**
- **Grid Layout**: Responsive cards (1-3 columns based on screen size)
- **Task Cards**: Show title, description, status badge, priority badge, deadline
- **� How to Use

### 1. Login
- Click "Continue with Google"
- Choose your Google account
- You're in!

### 2. Create a Task
- Click "Create Task" button
- Enter title and description
- Choose priority (High/Medium/Low)
- Set a deadline (optional)
- Click "Create Task"

### 3. Manage Tasks
- See all your tasks on the dashboard
- Use filters to find tasks by status or priority
- Search by typing keywords
- Click edit icon ✏️ to update a task
- Click delete icon 🗑️ to remove a task

### 4. Other Features
- Toggle dark mode with the moon/sun icon
- Sort tasks by deadline or creation date
- See task statistics at the top

## 🚀 Deployment Guide

### Frontend Deployment (Vercel)

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin master
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click **"Import Project"**
   - Select your GitHub repository
   - Configure settings:
     - **Framework**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Add Environment Variables**:
   In Vercel dashboard → Settings → Environment Variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_URL=https://your-backend.onrender.com
   ```

4. **Deploy**: Click **"Deploy"** and wait for build to complete

5. **Update Firebase Authorized Domains**:
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

### Backend Deployment (Render)

Summary

TaskLoop is a simple task manager that helps you organize your work. It's built with React for the website, Express for the server, and Firebase for login and database.

### What Makes It Special
- ✅ Easy to use with Google login
- ✅ Priority levels to know what's important
- ✅ Search and filter to find tasks quickly
- ✅ Works on phone, tablet, and computer
- ✅ Dark mode for night-time use
- ✅ Your tasks are saved in the cloud

### What I Learned
- Building a complete web application from scratch
- Connecting frontend and backend
- Using Firebase for authentication and database
- Making websites look good with Tailwind CSS
- Deploying apps to the internet

### Future Ideas
- 📧 Send email reminders for deadlines
- 👥 Share tasks with teammates
- 📎 Attach files to tasks
- 📱 Make it work offline
- 📊 Show charts and statistics� Developer

**Abhishiktha**  
GitHub: [@abhishiktha-15](https://github.com/abhishiktha-15)

---

## 📄 License

This project is open source (MIT License). Feel free to use and modify it!

---

## 🙏 Credits

Built with these awesome tools:
- React - For the user interface
- Firebase - For login and database
- Tailwind CSS - For styling
- Express - For the server
- Vercel & Render - For hosting

---

<div align="center">

**⭐ If you like this project, give it a star on [GitHub](https://github.com/abhishiktha-15/Task-Manager)!**

[🚀 Try Live Demo](https://ak-taskloop.vercel.app