const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || typeof username !== 'string' || username.trim() === '') {
      return res.status(400).json({ message: 'Username is required and must be a non-empty string.' });
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ message: 'Email is required and must be a non-empty string.' });
    }
      
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
    

    if (!password || typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({ message: 'Password is required and must be a non-empty string.' });
    }
      
    const hashedPassword = await bcrypt.hash(password, 10);
      
    const newUser = await userModel.createUser({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });
      
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
      
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
      console.error('Error in signup:', error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ message: 'Email is required and must be a non-empty string.' });
    }
    
    if (!password || typeof password !== 'string' || password.trim() === '') {
       return res.status(400).json({ message: 'Password is required and must be a non-empty string.' });
     }

    const user = await userModel.getUserByEmail(email.trim());

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
      
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
      
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
      console.error('Error in login:', error);
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        
        if(!user){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json({ message: 'Profile fetched successfully', user });
    } catch (error) {
        console.error('Error in getProfile:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  signup,
  login,
  getProfile,
};