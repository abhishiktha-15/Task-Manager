import express from 'express';
import { verifyGoogleToken, getCurrentUser } from '../controllers/authController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/google - Verify Google Firebase token
router.post('/google', verifyGoogleToken);

// GET /api/auth/me - Get current user (protected)
router.get('/me', verifyFirebaseToken, getCurrentUser);

export default router;
