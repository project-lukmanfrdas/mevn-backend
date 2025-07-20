import User from "../models/user.model.js";
import { paginatedResponse } from "../utils/response.js";

/**
 * @desc Get all users (paginated & standardized response)
 */
export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await User.countDocuments();

    const users = await User.find().skip(skip).limit(limit);

    res.json(paginatedResponse({ data: users, page, limit, total }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get user by ID
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Create user
 */
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "Email is already used" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Update user
 */
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password;

    await user.save();
    res.json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Delete user
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get all users (paginated & standardized response)
 */
export const getTotalUser = async (req, res) => {
  try {
    const total = await User.countDocuments();

    res.json({ data: total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
