import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import config from "../config/config.js";

export const signin = async(req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email, roles: "admin" });

    if(existingUser && existingUser.roles === "admin") {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, config.JWT_SECRET, {expiresIn: "240h"});

      res.status(200).json({ result: existingUser, token });
    } else {
      return res.status(404).json({ message: "Admin doesn't exist." });
    }

  } catch {
    res.status(500).json({ message: "Something went wrong." })
  }
}

export const signup = async(req, res) => {
  const { userName, email, password, confirmPassword  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if(existingUser && existingUser.roles === "admin") return res.status(400).json({message: "User already exist."})

    if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match." })

    const hashedPassword = await bcrypt.hash(password, 12);

    const role = "admin";

    const result = await User.create({ email, password: hashedPassword, userName: userName, roles: role, isVerified: true})

    const token = jwt.sign({ email: result.email, id: result._id }, config.JWT_SECRET, { expiresIn: "240h" });

    res.status(200).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}

// GET UESR CONTROLLER
export const getUsers = async(req, res) => {
  try {
    const userList = await User.find();

    res.status(200).json({ data: userList })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}