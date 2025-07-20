/**
 * Main entry point for the Express server application.
 *
 * - Loads environment variables from .env file.
 * - Connects to MongoDB using mongoose.
 * - Sets up CORS with allowed origin from environment or localhost.
 * - Configures JSON body parsing middleware.
 * - Registers authentication and user-related API routes.
 * - Serves Swagger API documentation at /api-docs.
 * - Starts the server listening on configured port (default 3003).
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerDocs from "./config/swagger.js";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

connectDB();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
