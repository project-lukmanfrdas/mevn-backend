import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import connectDB from "../config/db.js";

/**
 * Seeds the database with initial users.
 * - Connects to MongoDB
 * - Clears existing users collection
 * - Inserts predefined user documents with hashed passwords
 *
 * Exits the process on success or failure.
 */
const seedUsers = async () => {
  try {
    await connectDB();

    // Clear existing users collection
    await User.deleteMany();

    // Initial users to seed
    const users = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("123456", 10),
      },
      {
        name: "Test User",
        email: "test@example.com",
        password: await bcrypt.hash("password", 10),
      },
    ];

    await User.insertMany(users);

    console.log("✅ User seeding success!");
    process.exit();
  } catch (err) {
    console.error("❌ Error while seeding:", err);
    process.exit(1);
  }
};

seedUsers();
