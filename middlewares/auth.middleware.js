/**
 * Middleware to protect routes by verifying JWT token.
 *
 * It checks for a Bearer token in the Authorization header,
 * verifies the token using the JWT secret,
 * and attaches the authenticated user object to `req.user` (excluding password).
 *
 * If token is missing or invalid, it returns a 401 Unauthorized response.
 *
 * otherwise sends 401 Unauthorized response.
 */
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
