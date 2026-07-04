import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
  updateUsername,
  changePassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, getMe);
router.put("/profile", protect, updateUsername);
router.put("/password", protect, changePassword);

export default router;
