import mongoose from 'mongoose';

const signUpUserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  salt: { type: String, required: true }
});

module.exports = mongoose.model("SignUpUser", signUpUserSchema);