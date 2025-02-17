const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'chef', 'cashier'], // Only allow these three values
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;