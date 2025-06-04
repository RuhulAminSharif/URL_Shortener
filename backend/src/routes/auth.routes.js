
import express from 'express';
import { register_user, login_user, logout_user } from '../controller/auth.controller.js';

const router = express.Router();  

// Register route
router.post('/register', register_user); 
// Login route
router.post('/login', login_user);
// Logout route
router.post('/logout', logout_user);

export default router;