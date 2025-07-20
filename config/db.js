import mongoose from "mongoose";

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * Reads the MongoDB connection URI from the environment variable `DB_URI`.
 * If the connection is successful, logs a success message.
 * If the connection fails, logs the error message and terminates the process.
 *
 * @async
 * @function connectDB
 */
const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
