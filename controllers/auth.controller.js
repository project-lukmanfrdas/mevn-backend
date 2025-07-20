import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

/**
 * Authenticates a user and returns a JWT token on success.
 *
 * @async
 * @function login
 *
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // If user not found or password does not match, respond with 401 Unauthorized
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  // Respond with user details and generated JWT token
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};
