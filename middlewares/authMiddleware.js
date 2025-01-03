const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    const token = tokenParts[1];


    let decodedToken;
    try {
       decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
        if (jwtError.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else {
             return res.status(401).json({ message: 'Invalid token' });
        }

    }


    const userId = decodedToken.userId;

    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in authenticate middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  authenticate,
};