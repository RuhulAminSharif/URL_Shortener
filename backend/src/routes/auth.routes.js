import express from "express";
import {
  register_user,
  login_user,
  logout_user,
  get_current_user,
} from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register route
router.post("/register", register_user);
// Login route
router.post("/login", login_user);
// Logout route
router.post("/logout", logout_user);

router.get("/me", authMiddleware, get_current_user);

export default router;
