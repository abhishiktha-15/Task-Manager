import { auth, db } from '../config/firebase.js';

/**
 * Verify Google Firebase token
 * This endpoint receives the Firebase ID token from frontend
 * and verifies it using Firebase Admin SDK
 */
export const verifyGoogleToken = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID token is required' 
      });
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    
    const { uid, email, name, picture } = decodedToken;

    // Store or update user in Firestore
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    const userData = {
      uid,
      email,
      name: name || email.split('@')[0],
      photo: picture || '',
      lastLogin: new Date().toISOString()
    };

    if (!userDoc.exists) {
      // Create new user
      await userRef.set({
        ...userData,
        createdAt: new Date().toISOString()
      });
    } else {
      // Update existing user
      await userRef.update({
        lastLogin: userData.lastLogin
      });
    }

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      user: userData
    });

  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (req, res) => {
  try {
    const { uid } = req.user;

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: userDoc.data()
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};
