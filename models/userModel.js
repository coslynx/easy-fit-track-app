const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
           validator: function(v) {
               return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
           },
           message: 'Invalid email format'
         },
         index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});


userSchema.statics.createUser = async function (userData) {
  try {
    if (!userData.username || typeof userData.username !== 'string' || userData.username.trim() === '') {
      throw new Error('Username is required and must be a non-empty string.');
    }
    if (!userData.email || typeof userData.email !== 'string' || userData.email.trim() === '') {
      throw new Error('Email is required and must be a non-empty string.');
    }
     if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userData.email)) {
      throw new Error('Invalid email format.');
    }

    if (!userData.password || typeof userData.password !== 'string' || userData.password.trim() === '') {
      throw new Error('Password is required and must be a non-empty string.');
    }

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await this.create({
        username: userData.username.trim(),
        email: userData.email.trim().toLowerCase(),
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
      throw new Error(error.message);
    }
  };


userSchema.statics.getUserByEmail = async function (email) {
    try {
      if (!email || typeof email !== 'string' || email.trim() === '') {
        throw new Error('Email is required and must be a non-empty string.');
      }
        const user = await this.findOne({ email: email.trim().toLowerCase() }).select('+password');
        return user;
    } catch (error) {
        console.error('Error getting user by email:', error);
      throw new Error(error.message);
    }
  };


userSchema.statics.getUserById = async function (id) {
  try {
        if (!id) {
            throw new Error('User ID is required.');
          }
    const user = await this.findById(id).select('-password');
        return user;
  } catch (error) {
        console.error('Error getting user by ID:', error);
    throw new Error(error.message);
  }
};


userSchema.statics.updateUser = async function (id, updateData) {
    try {
      if (!id) {
          throw new Error('User ID is required.');
      }
       if (updateData.username && (typeof updateData.username !== 'string' || updateData.username.trim() === '')) {
          throw new Error('Username must be a non-empty string.');
        }

        if (updateData.email) {
          if (typeof updateData.email !== 'string' || updateData.email.trim() === '') {
            throw new Error('Email must be a non-empty string.');
            }
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(updateData.email)) {
                throw new Error('Invalid email format.');
            }
         }


      const update = { ...updateData, updatedAt: new Date() }
    
        if(update.username) {
            update.username = update.username.trim()
        }
        if(update.email) {
            update.email = update.email.trim().toLowerCase()
        }
    const updatedUser = await this.findByIdAndUpdate(id, update, { new: true }).select('-password');

    if (!updatedUser) {
        throw new Error('User not found.');
    }
        return updatedUser;
  } catch (error) {
        console.error('Error updating user:', error);
    throw new Error(error.message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;