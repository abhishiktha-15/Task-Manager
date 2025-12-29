import { db } from '../config/firebase.js';

/**
 * Create a new task
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const { uid } = req.user;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    // Create task object
    const taskData = {
      title,
      description,
      status: status || 'Pending',
      priority: priority || 'Medium',
      userId: uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add deadline if provided
    if (deadline) {
      taskData.deadline = deadline;
    }

    // Add to Firestore
    const taskRef = await db.collection('tasks').add(taskData);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: {
        id: taskRef.id,
        ...taskData
      }
    });

  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

/**
 * Get all tasks for the authenticated user
 */
export const getTasks = async (req, res) => {
  try {
    const { uid } = req.user;

    // Query tasks by userId - remove orderBy to avoid index requirement
    const tasksSnapshot = await db
      .collection('tasks')
      .where('userId', '==', uid)
      .get();

    const tasks = [];
    tasksSnapshot.forEach(doc => {
      tasks.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Sort in memory instead of in the query
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks
    });

  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

/**
 * Get a single task by ID
 */
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.user;

    const taskDoc = await db.collection('tasks').doc(id).get();

    if (!taskDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const taskData = taskDoc.data();

    // Ensure the task belongs to the authenticated user
    if (taskData.userId !== uid) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      task: {
        id: taskDoc.id,
        ...taskData
      }
    });

  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
};

/**
 * Update a task
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, deadline } = req.body;
    const { uid } = req.user;

    // Get the task
    const taskDoc = await db.collection('tasks').doc(id).get();

    if (!taskDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const taskData = taskDoc.data();

    // Ensure the task belongs to the authenticated user
    if (taskData.userId !== uid) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update task
    const updatedData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(status && { status }),      ...(priority && { priority }),      updatedAt: new Date().toISOString()
    };

    // Add deadline if provided (allow null to remove)
    if (deadline !== undefined) {
      updatedData.deadline = deadline;
    }

    await db.collection('tasks').doc(id).update(updatedData);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task: {
        id,
        ...taskData,
        ...updatedData
      }
    });

  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.user;

    // Get the task
    const taskDoc = await db.collection('tasks').doc(id).get();

    if (!taskDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const taskData = taskDoc.data();

    // Ensure the task belongs to the authenticated user
    if (taskData.userId !== uid) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Delete the task
    await db.collection('tasks').doc(id).delete();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};
