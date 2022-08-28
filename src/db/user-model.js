const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date },
});

module.exports = model('users', userSchema);
