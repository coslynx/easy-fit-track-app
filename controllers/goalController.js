const goalModel = require('../models/goalModel');
const authMiddleware = require('../middlewares/authMiddleware');

const createGoal = async (req, res) => {
  try {
    const { title, description, startDate, targetDate } = req.body;
    const userId = req.user._id;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
    }

      if (!description || typeof description !== 'string' || description.trim() === '') {
          return res.status(400).json({ message: 'Description is required and must be a non-empty string.' });
      }
      
      if (!startDate || typeof startDate !== 'string' || startDate.trim() === '') {
           return res.status(400).json({ message: 'Start date is required and must be a non-empty string.' });
      }

    if (!targetDate || typeof targetDate !== 'string' || targetDate.trim() === '') {
          return res.status(400).json({ message: 'Target date is required and must be a non-empty string.' });
    }
      
    const sanitizedTitle = String(title).trim();
    const sanitizedDescription = String(description).trim();
      const sanitizedStartDate = String(startDate).trim();
      const sanitizedTargetDate = String(targetDate).trim();

    const newGoal = await goalModel.createGoal({
        userId: userId,
      title: sanitizedTitle,
      description: sanitizedDescription,
      startDate: sanitizedStartDate,
      targetDate: sanitizedTargetDate,
    });

    res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
  } catch (error) {
      console.error('Error in createGoal:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, startDate, targetDate } = req.body;
      const userId = req.user._id;


    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required and must be a non-empty string.' });
    }

      if (!description || typeof description !== 'string' || description.trim() === '') {
          return res.status(400).json({ message: 'Description is required and must be a non-empty string.' });
      }

      if (!startDate || typeof startDate !== 'string' || startDate.trim() === '') {
          return res.status(400).json({ message: 'Start date is required and must be a non-empty string.' });
      }
      
      if (!targetDate || typeof targetDate !== 'string' || targetDate.trim() === '') {
          return res.status(400).json({ message: 'Target date is required and must be a non-empty string.' });
      }
      
    const sanitizedTitle = String(title).trim();
    const sanitizedDescription = String(description).trim();
    const sanitizedStartDate = String(startDate).trim();
      const sanitizedTargetDate = String(targetDate).trim();

    const goal = await goalModel.getGoal(id);

      if (!goal) {
          return res.status(404).json({ message: 'Goal not found' });
      }

      if (goal.userId.toString() !== userId.toString()) {
          return res.status(401).json({ message: 'Unauthorized' });
      }
      
    const updatedGoal = await goalModel.updateGoal(id, {
      title: sanitizedTitle,
      description: sanitizedDescription,
        startDate: sanitizedStartDate,
      targetDate: sanitizedTargetDate,
    });

    res.status(200).json({ message: 'Goal updated successfully', goal: updatedGoal });
  } catch (error) {
      console.error('Error in updateGoal:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
      const userId = req.user._id;

      const goal = await goalModel.getGoal(id);

      if (!goal) {
          return res.status(404).json({ message: 'Goal not found' });
      }

      if (goal.userId.toString() !== userId.toString()) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

    await goalModel.deleteGoal(id);
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
      console.error('Error in deleteGoal:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllGoals = async (req, res) => {
    try {
        const userId = req.user._id;
    const goals = await goalModel.getAllGoals(userId);
    res.status(200).json(goals);
  } catch (error) {
      console.error('Error in getAllGoals:', error);
    res.status(500).json({ message: error.message });
  }
};


const getGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const goal = await goalModel.getGoal(id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.userId.toString() !== userId.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json(goal);
    } catch (error) {
        console.error('Error in getGoal:', error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
  createGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
    getGoal,
};