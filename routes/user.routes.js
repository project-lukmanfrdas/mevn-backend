import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getTotalUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

/**
 * @route GET /users
 * @desc Get paginated list of users
 * @access Private
 */
router.route("/").get(getUsers)

/**
 * @route POST /users
 * @desc Create a new user
 * @access Private
 */
.post(createUser);

/**
 * @route GET /users/get-total-users
 * @desc Get total number of users
 * @access Private
 */
router.route("/get-total-users").get(getTotalUser);

/**
 * @route GET /users/:id
 * @desc Get user by ID
 * @access Private
 */
router.route("/:id").get(getUserById)

/**
 * @route PUT /users/:id
 * @desc Update user by ID
 * @access Private
 */
.put(updateUser)

/**
 * @route DELETE /users/:id
 * @desc Delete user by ID
 * @access Private
 */
.delete(deleteUser);

export default router;
