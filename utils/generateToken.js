import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token containing the user ID as payload.
 *
 * @param {string} id - User ID to encode in the token.
 * @returns {string} Signed JWT token valid for 7 days.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
