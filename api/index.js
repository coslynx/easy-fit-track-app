const express = require('express');
const authController = require('../controllers/authController');
const goalController = require('../controllers/goalController');
const authMiddleware = require('../middlewares/authMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Adjust as needed for production
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Authentication routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    await authController.signup(req, res);
  } catch (error) {
    console.error('Error in /api/auth/signup:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
     console.error('Error in /api/auth/login:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/auth/profile', authMiddleware.authenticate, async (req, res) => {
    try {
        await authController.getProfile(req, res);
    } catch (error) {
         console.error('Error in /api/auth/profile:', error);
        res.status(500).json({ message: error.message });
    }
});

// Goal routes
app.post('/api/goals', authMiddleware.authenticate, async (req, res) => {
    try {
       await goalController.createGoal(req, res);
    } catch (error) {
         console.error('Error in /api/goals POST:', error);
      res.status(500).json({ message: error.message });
    }
});

app.put('/api/goals/:id', authMiddleware.authenticate, async (req, res) => {
    try {
         await goalController.updateGoal(req, res);
    } catch (error) {
         console.error('Error in /api/goals/:id PUT:', error);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/goals/:id', authMiddleware.authenticate, async (req, res) => {
  try {
     await goalController.deleteGoal(req, res);
  } catch (error) {
       console.error('Error in /api/goals/:id DELETE:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/goals', authMiddleware.authenticate, async (req, res) => {
  try {
      await goalController.getAllGoals(req, res);
  } catch (error) {
       console.error('Error in /api/goals GET:', error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/goals/:id', authMiddleware.authenticate, async (req, res) => {
    try {
        await goalController.getGoal(req, res);
    } catch (error) {
         console.error('Error in /api/goals/:id GET:', error);
      res.status(500).json({ message: error.message });
    }
});

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
    console.error('Server startup error:', error);
});

process.on('SIGINT', () => {
    console.log('Server is shutting down');
    server.close(() => {
      console.log('Server stopped');
      process.exit(0);
    });
  });