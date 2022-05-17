import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  isVerified: {
    type: Boolean,
    default: false,
    required: false,
  },
  id: String
}, {timestamps: true});

export default mongoose.model("User", userSchema);