import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @route POST /login
 * @desc Authenticate user and return JWT token
 * @access Public
 */
router.post("/login", login);

export default router;
