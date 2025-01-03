const mongoose = require('mongoose');

// Define the goal schema
const goalSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: String,
        required: true,
        trim: true
    },
    targetDate: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


goalSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Static method to create a new goal
goalSchema.statics.createGoal = async function (goalData) {
    try {
        // Validate input data
        if (!goalData.userId) {
           throw new Error('User ID is required.');
        }

        if (!goalData.title || typeof goalData.title !== 'string' || goalData.title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string.');
        }
        if (!goalData.description || typeof goalData.description !== 'string' || goalData.description.trim() === '') {
            throw new Error('Description is required and must be a non-empty string.');
        }
        if (!goalData.startDate || typeof goalData.startDate !== 'string' || goalData.startDate.trim() === '') {
            throw new Error('Start date is required and must be a non-empty string.');
        }
        if (!goalData.targetDate || typeof goalData.targetDate !== 'string' || goalData.targetDate.trim() === '') {
            throw new Error('Target date is required and must be a non-empty string.');
        }

        // Create a new goal document
        const newGoal = await this.create({
            userId: goalData.userId,
            title: goalData.title.trim(),
            description: goalData.description.trim(),
            startDate: goalData.startDate.trim(),
            targetDate: goalData.targetDate.trim(),
        });

        return newGoal;
    } catch (error) {
        console.error('Error creating goal:', error);
        throw new Error(error.message);
    }
};

// Static method to get a goal by ID
goalSchema.statics.getGoal = async function (id) {
    try {
        if (!id) {
            throw new Error('Goal ID is required.');
        }

        const goal = await this.findById(id);

        if (!goal) {
            throw new Error('Goal not found.');
        }
        return goal;
    } catch (error) {
        console.error('Error getting goal:', error);
        throw new Error(error.message);
    }
};

// Static method to update a goal
goalSchema.statics.updateGoal = async function (id, updateData) {
    try {
         if (!id) {
             throw new Error('Goal ID is required.');
         }

        if (updateData.title && (typeof updateData.title !== 'string' || updateData.title.trim() === '')) {
            throw new Error('Title must be a non-empty string.');
        }
        if (updateData.description && (typeof updateData.description !== 'string' || updateData.description.trim() === '')) {
            throw new Error('Description must be a non-empty string.');
        }
        if (updateData.startDate && (typeof updateData.startDate !== 'string' || updateData.startDate.trim() === '')) {
            throw new Error('Start date must be a non-empty string.');
        }
        if (updateData.targetDate && (typeof updateData.targetDate !== 'string' || updateData.targetDate.trim() === '')) {
             throw new Error('Target date must be a non-empty string.');
        }
        
        const update = { ...updateData, updatedAt: new Date() }
        
         if(update.title) {
             update.title = update.title.trim()
         }
        if(update.description) {
             update.description = update.description.trim()
        }
        if(update.startDate) {
            update.startDate = update.startDate.trim()
        }
        if(update.targetDate) {
             update.targetDate = update.targetDate.trim()
        }


        const updatedGoal = await this.findByIdAndUpdate(id, update, { new: true });

        if (!updatedGoal) {
            throw new Error('Goal not found.');
        }
        return updatedGoal;
    } catch (error) {
        console.error('Error updating goal:', error);
        throw new Error(error.message);
    }
};

// Static method to delete a goal
goalSchema.statics.deleteGoal = async function (id) {
    try {
         if (!id) {
            throw new Error('Goal ID is required.');
        }
        const deletedGoal = await this.findByIdAndDelete(id);

        if (!deletedGoal) {
            throw new Error('Goal not found.');
        }

        return deletedGoal;
    } catch (error) {
        console.error('Error deleting goal:', error);
        throw new Error(error.message);
    }
};

// Static method to get all goals for a user
goalSchema.statics.getAllGoals = async function (userId) {
    try {
         if (!userId) {
             throw new Error('User ID is required.');
         }
        const goals = await this.find({ userId: userId });
        return goals;
    } catch (error) {
        console.error('Error getting all goals:', error);
        throw new Error(error.message);
    }
};


const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;