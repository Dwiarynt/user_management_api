import express from 'express';
import { getUsers, uploadAvatar, updateProfile, getCurrentUser, deleteMe } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', verifyToken, getUsers);
router.get('/me', verifyToken, getCurrentUser);         
router.put('/me', verifyToken, updateProfile);          
router.post('/avatar', verifyToken, upload.single('file'), uploadAvatar);
router.put('/profile', verifyToken, updateProfile);
router.delete('/me', verifyToken, deleteMe);     

export default router;
router.delete('/me', verifyToken, deleteMe);
