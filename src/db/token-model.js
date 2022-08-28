const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const tokenSchema = new Schema({
  userId: { type: ObjectId, ref: 'users', required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: true },
  activationLink: { type: String },
});

module.exports = model('tokens', tokenSchema);
