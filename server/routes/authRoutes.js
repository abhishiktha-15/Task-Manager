import express from 'express';
import { initiateGoogleOAuth, verifyGoogleToken, getCurrentUser } from '../controllers/authController.js';
import { verifyFirebaseToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/auth/google - Initiate Google OAuth (redirect-based)
router.get('/google', initiateGoogleOAuth);

// POST /api/auth/google - Verify Google Firebase token (existing flow)
router.post('/google', verifyGoogleToken);

// GET /api/auth/me - Get current user (protected)
router.get('/me', verifyFirebaseToken, getCurrentUser);

export default router;
