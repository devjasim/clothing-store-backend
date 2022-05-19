import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  id: String
}, {timestamps: true});

export default mongoose.model("User", userSchema);