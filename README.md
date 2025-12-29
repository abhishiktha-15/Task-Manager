# 🎯 Task Management Web Application

A modern, full-stack task management application built with **Firebase Authentication**, **Firestore Database**, **React (Vite)**, and **Express Backend**. This project demonstrates industry-standard architecture with secure authentication, real-time database operations, and a beautiful, responsive UI.

![Tech Stack](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-10.7-FFCA28?logo=firebase)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?logo=tailwindcss)

---

## 🌟 Features

✅ **Google OAuth Authentication** - Secure sign-in with Firebase Auth  
✅ **Full CRUD Operations** - Create, Read, Update, Delete tasks  
✅ **Task Status Management** - Pending, In Progress, Completed  
✅ **Real-time Dashboard** - View all tasks with filters and statistics  
✅ **Protected Routes** - Backend verification with Firebase Admin SDK  
✅ **Responsive Design** - Works on all devices  
✅ **Smooth Animations** - Framer Motion for delightful UX  
✅ **Modern UI** - Tailwind CSS with custom components  

---

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │ ─── Google Login ──▶ Firebase Auth
└─────────────────┘                            │
        │                                      │
        │ ID Token                             │
        ▼                                      │
┌─────────────────┐                           │
│  Express API    │ ◀─── Verify Token ────────┘
└─────────────────┘
        │
        │ Firebase Admin SDK
        ▼
┌─────────────────┐
│    Firestore    │
└─────────────────┘
```

---

## 📁 Project Structure

```
Task 3/
│
├── server/                     # Backend (Express + Firebase Admin)
│   ├── config/
│   │   └── firebase.js         # Firebase Admin SDK setup
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── taskController.js   # Task CRUD operations
│   ├── routes/
│   │   ├── authRoutes.js       # Auth endpoints
│   │   └── taskRoutes.js       # Task endpoints
│   ├── middleware/
│   │   └── authMiddleware.js   # Token verification
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env.example
│
└── client/                     # Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx      # Navigation bar
    │   │   ├── TaskCard.jsx    # Task display card
    │   │   └── Loader.jsx      # Loading component
    │   ├── pages/
    │   │   ├── Login.jsx       # Login page
    │   │   ├── Dashboard.jsx   # Main dashboard
    │   │   ├── CreateTask.jsx  # Create task page
    │   │   └── EditTask.jsx    # Edit task page
    │   ├── services/
    │   │   └── api.js          # API service layer
    │   ├── firebase.js         # Firebase client config
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # Entry point
    │   └── index.css           # Global styles
    ├── package.json
    └── .env.example
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Firebase Account** (with project created)
- **Git**

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd "Task 3"
```

### 2️⃣ Firebase Setup

#### A. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"**
3. Enter project name and follow setup steps
4. Enable **Google Analytics** (optional)

#### B. Enable Google Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Add your email as authorized domain

#### C. Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Start in **production mode**
3. Choose location closest to you

#### D. Generate Service Account Key (for Backend)

1. Go to **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"**
3. Save the JSON file as `serviceAccountKey.json`
4. Move it to `server/config/` directory

#### E. Get Web App Config (for Frontend)

1. Go to **Project Settings** → **General**
2. Scroll to **"Your apps"** → Click **Web** icon
3. Register your app
4. Copy the configuration object

---

### 3️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` file (copy from `.env.example`):

```env
PORT=5000
NODE_ENV=development
FIREBASE_SERVICE_ACCOUNT_PATH=./config/serviceAccountKey.json
```

Start the server:

```bash
npm run dev
```

Server runs on **http://localhost:5000**

---

### 4️⃣ Frontend Setup

```bash
cd client
npm install
```

Create `.env` file (copy from `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔐 API Endpoints

### Authentication

| Method | Endpoint       | Description              | Auth Required |
|--------|----------------|--------------------------|---------------|
| POST   | /api/auth/google | Verify Firebase ID token | No            |
| GET    | /api/auth/me     | Get current user        | Yes           |

### Tasks

| Method | Endpoint          | Description          | Auth Required |
|--------|-------------------|----------------------|---------------|
| POST   | /api/tasks        | Create new task      | Yes           |
| GET    | /api/tasks        | Get all user tasks   | Yes           |
| GET    | /api/tasks/:id    | Get task by ID       | Yes           |
| PUT    | /api/tasks/:id    | Update task          | Yes           |
| DELETE | /api/tasks/:id    | Delete task          | Yes           |

---

## 📊 Database Structure

### Users Collection (`users`)

```json
{
  "uid": "firebase_user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "photo": "https://example.com/photo.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastLogin": "2024-01-15T10:30:00.000Z"
}
```

### Tasks Collection (`tasks`)

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and setup guides",
  "status": "In Progress",
  "userId": "firebase_user_id",
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

---

## 🎨 Tech Stack Details

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Firebase SDK** - Authentication
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Firebase Admin SDK** - Auth & Database
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

---

## 🔒 Security Features

✅ Firebase ID token verification  
✅ Protected API routes with middleware  
✅ User-specific data isolation  
✅ CORS configuration  
✅ Environment variable protection  

---

## 🎯 Project Highlights

This project demonstrates:

- ✅ **Full-stack development** with modern tools
- ✅ **Firebase integration** (Auth + Firestore)
- ✅ **RESTful API design** with Express
- ✅ **Protected routes** on both frontend and backend
- ✅ **Responsive UI/UX** with animations
- ✅ **Clean code architecture** and folder structure
- ✅ **Production-ready** configuration

---

## 📝 Usage Guide

### 1. Login
- Click **"Continue with Google"**
- Select your Google account
- Automatically redirected to Dashboard

### 2. Create Task
- Click **"Create Task"** button
- Fill in title, description, and status
- Click **"Create Task"** to save

### 3. Manage Tasks
- View all tasks on Dashboard
- Filter by status (All, Pending, In Progress, Completed)
- Edit task by clicking edit icon
- Delete task with confirmation modal

### 4. Logout
- Click **Logout** button in navbar
- Redirected to login page

---

## 🛠️ Development Tips

### Testing Backend APIs

Use **Postman** or **cURL**:

```bash
# Health check
curl http://localhost:5000/health

# Get tasks (requires auth token)
curl -H "Authorization: Bearer YOUR_FIREBASE_TOKEN" \
     http://localhost:5000/api/tasks
```

### Firebase Emulator (Optional)

For local development without using production Firebase:

```bash
firebase emulators:start
```

---

## 📦 Deployment

### Backend (Render/Railway/Heroku)

1. Set environment variables in platform
2. Use `FIREBASE_SERVICE_ACCOUNT` as JSON string
3. Deploy from GitHub repository

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Created as an internship task demonstrating modern web development practices.

---

## 🙏 Acknowledgments

- Firebase Documentation
- React Documentation
- Tailwind CSS
- Framer Motion
- Lucide Icons

---

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

**Happy Coding! 🚀**
