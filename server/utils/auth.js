const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('@apollo/server');

const secret = process.env.JWT_SECRET || 'mysecretssshhhhhhh'; // Use environment variable for secret
const expiration = '2h';

const authMiddleware = ({ req }) => {
  const token = req.headers.authorization || '';

  try {
    if (token) {
      // Remove 'Bearer ' prefix if present
      const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
      return { user: decoded.data };
    }
  } catch (err) {
    throw new AuthenticationError('Invalid or expired token');
  }

  return { user: null };
};

module.exports = {
  authMiddleware,
  signToken: (user) => jwt.sign({ data: user }, secret, { expiresIn: expiration })
};
