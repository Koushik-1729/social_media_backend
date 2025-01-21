import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialMediaHandle: { type: String, required: true },
  images: { type: [String], required: true },
});

const UserData = mongoose.model('UserData', userSchema);

export default UserData;
