import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  avatar: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  id: String,
  roles: {
    type: String,
    required: true,
    default: "user",
    enum: ["user", "admin"]
  },
  otp: {
    type: String,
  },
  changePass: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

export default mongoose.model("User", userSchema);