const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
  avatarUrl: { type: String },

  token: { type: String, required: true },

  status: { type: String, default: 'active' },
  isAdmin: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = User = mongoose.model('User', userSchema);