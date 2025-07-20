import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User schema definition for MongoDB.
 *
 * Fields:
 * - name: User's full name
 * - email: Unique email address used for login
 * - password: Hashed password stored securely
 *
 * Timestamps are automatically added for creation and updates.
 */
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);

/**
 * Pre-save hook to hash the password before saving the user document.
 * Runs only if the password field is newly set or modified.
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Instance method to compare a plain text password with the stored hashed password.
 * @param {string} password - Plain text password to compare
 * @returns {Promise<boolean>} Returns true if the password matches, false otherwise
 */
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
