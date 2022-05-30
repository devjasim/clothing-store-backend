import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import config from "../config/config.js";
import mongoose from "mongoose";
import moment from "moment";

export const signin = async(req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email, roles: "admin" });

    if(!existingUser) return res.status(404).json({ message: "Admin doesn't exist." });

    if(existingUser && existingUser.roles === "admin") {
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, config.JWT_SECRET, {expiresIn: "240h"});

      return res.status(200).json({ result: existingUser, token });
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

// DELETE USER
export const deleteUser = async(req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user found this is ID');

  await User.findByIdAndDelete(id);

  res.status(200).json({message: "User deleted successfully!"})
}

export const getUserById = async(req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No user found with this ID");
  
  if(id) {
    const getUser = await User.findById(id);

    if(!getUser) {
      return res.status(404).json({message: "User doesn't exists!"});
    };

    res.status(200).json({result: getUser});
  }
}

// Update user
export const updateUser = async(req, res) => {
  const {id: _id} = req.params;

  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No user found with this ID");

  const userExits = await User.findById(_id);

  if(!userExits) return res.status(404).send("No user found with this ID");

  const {newPassword, confirmPassword} = req.body;

  if(newPassword && confirmPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    if(newPassword !== confirmPassword) return res.status(400).json({ message: "Password don't match!" })

    // const isPasswordCorrect = await bcrypt.compare(password, userExits.password);

    // if(userExits.changePass && !isPasswordCorrect) return res.status(400).json({ message: "Incorrect password!" })

    const update = await User.findByIdAndUpdate(_id, { password: hashedPassword }, {new: true}).catch(err => res.status(500).json({message: err}))

    return res.status(200).json({
      message: "User is updated",
      result: update
    });
  }

  const updateUser = await User.findByIdAndUpdate(_id, { ...user }, {new: true}).catch(err => res.status(500).json({message: err}))

  return res.status(200).json({
    message: "User is updated.",
    result: updateUser
  });

}

export const dashboard = async(req, res) => {
  try {
    const userList = await User.find();

    const pastWeek = moment().subtract(7,'d').format('YYYY-MM-DD');
    const pastMonth = moment().subtract(30,'d').format('YYYY-MM-DD');

    var endOfDate = moment(new Date()).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    var startOfDate = moment(new Date()).subtract(1,'months').startOf('month').format('YYYY-MM-DD');

    let week;
    if(userList.length > 0) {
      week = userList.filter((item) => {
        const itemDate = moment(item.createdAt).format("YYYY-MM-DD");
        return itemDate >= pastWeek;
      });
    }

    let month;
    if(userList.length > 0) {
      month = userList.filter((item) => {
        const itemDate = moment(item.createdAt).format("YYYY-MM-DD");
        return itemDate >= pastMonth;
      });
    }

    let lastMonth;
    if(userList.length > 0) {
      lastMonth = userList.filter((item) => {
        const itemDate = moment(item.createdAt).format("YYYY-MM-DD");
        return itemDate >= startOfDate && itemDate <= endOfDate;
      });
    }

    const result = {
      total: userList?.length,
      lastWeek: week?.length,
      lastThirtee: month?.length,
      lastMonth: lastMonth?.length
    }

    return res.status(200).json({result: result});

  } catch (error) {
    return res.status(400).json(error);
  }
}