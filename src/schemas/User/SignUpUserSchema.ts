import mongoose from 'mongoose';
import ISignUpUser from 'interfaces/User/ISignUpUser';

const signUpUserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mail: { type: String, required: true },
  salt: { type: String, required: true }
});

export default mongoose.model("SignUpUser", signUpUserSchema);