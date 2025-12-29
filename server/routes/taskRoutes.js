import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// All task routes are protected
router.use(verifyFirebaseToken);

// POST /api/tasks - Create a new task
router.post('/', createTask);

// GET /api/tasks - Get all tasks for the authenticated user
router.get('/', getTasks);

// GET /api/tasks/:id - Get a single task by ID
router.get('/:id', getTaskById);

// PUT /api/tasks/:id - Update a task
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

export default router;
