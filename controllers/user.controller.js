import bcrypt from "bcryptjs";
import jwt, { decode } from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import config from "../config/config.js";
import { sendMail } from "../services/emailService.js";
import generateOtp from "../services/generateOtp.js";

const googlelClient = new OAuth2Client(config.GOOGLE_CLIENT_ID)

export const signin = async(req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    if(!existingUser.isVerified) return res.status(400).json({ message: "Uesr is not verified." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, config.JWT_SECRET, {expiresIn: "240h"});

    res.status(200).json({ result: existingUser, token });

  } catch {
    res.status(500).json({ message: "Something went wrong." })
  }
}

export const signup = async(req, res) => {
  const { userName, email, password, confirmPassword  } = req.body;
  try {
    const OTP = generateOtp();
    const existingUser = await User.findOne({ email, roles: "user" });
    if(existingUser && !existingUser?.isVerified) return res.status(400).json({message: "User already exists and not verified"})

    if(existingUser && existingUser?.isVerified === true) return res.status(400).json({message: "User already exists."})

    if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match." })

    const hashedPassword = await bcrypt.hash(password, 12);

    const hashedOtp = await bcrypt.hash(OTP.toString(), 12);

    const result = await User.create({ email, password: hashedPassword, changePass: true, userName: userName, otp: hashedOtp })

    try {
      await sendMail({
        to: email,
        OTP: OTP,
      });
      return res.status(200).json({ result });
    } catch (error) {
      return [false, 'Unable to sign up, Please try again later', error];
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}

export const verifyEmail = async(req, res) => {
  const { email, otp } = req.body;
  
  const user = await User.findOne({email, roles: "user"});

  if (!user) return res.status(404).json({ message:'User not found'});

  if (!otp) return res.status(400).json({ message:'OTP is required!'});

  const isOtpCorrect = await bcrypt.compare(otp.toString(), user.otp);

  if (!isOtpCorrect) return res.status(400).json({ message:'Invalid OTP' });

  User.findByIdAndUpdate(user._id, { $set: { isVerified: true }}, { new: true }, (err, result) => {
    if(err) {
      return res.status(400).json({message: "Something went wrong."})
    } else {
      const token = jwt.sign({ email: result.email, id: result._id }, config.JWT_SECRET, {expiresIn: "240h"});
      return res.status(200).json({result, token})
    }
  })
}

export const googleLogin = async(req, res) => {
    const { tokenId } = req.body;
    
    googlelClient.verifyIdToken({idToken: tokenId, audience: config.GOOGLE_CLIENT_ID}).then(response => {
      
    const {email_verified: isVerified, name: userName, email, picture: avatar} = response.payload

    if(isVerified) {
      User.findOne({email, roles: "user"}).exec(async(err, user) => {
        if(err) {
          return res.status(400).json({
            message: "Something went wrong"
          })
        } else {
          if(user) {
            const token = jwt.sign({ email: user.email, id: user._id }, config.JWT_SECRET, {expiresIn: "240h"});
            if(!user.isVerified) {
              User.findByIdAndUpdate(user._id, { $set: { isVerified, avatar: user.avatar ? user.avatar : avatar }}, { new: true }, (err, result) => {
                if(err) {
                  return res.status(400).json({message: "Something went wrong."})
                } else {
                  return res.status(200).json({result, token})
                }
              })
            } else {
              res.status(200).json({ result: user, token });
            }
          } else {
            try {
              const hashedPassword = await bcrypt.hash(email, 12);

              const result = await User.create({ email, password: hashedPassword, userName, isVerified, avatar})

              const token = jwt.sign({ email: email, id: result._id, }, config.JWT_SECRET, {expiresIn: "240h"});

              res.status(200).json({ result, token });
            } catch (error) {
              res.status(500).json({ message: "Something went wrong." });
            }
          }
        }
      })
    }
  })

}

export const getUser = async(req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  let decodedData;

  if(token) {
    decodedData = jwt.verify(token, config.JWT_SECRET);
  }

  const {id: _id} = decodedData;

  if (!mongoose.Types.ObjectId.isValid(_id))
  return res.status(404).send("No user found with this ID");
  
  if(_id) {
    const getUser = await User.findById(_id);

    if(!getUser) {
      return res.status(404).json({message: "User doesn't exists!"});
    };

    res.status(200).json({result: getUser});
  }

}

export const updateUser = async(req, res) => {
  const { id: _id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user found with this ID");

  const userExits = await User.findById(_id);

  if(!userExits) return res.status(404).send("No user found with this ID");

  const {password, newPassword, confirmPassword} = req.body;

  if(newPassword && confirmPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    if(newPassword !== confirmPassword) return res.status(400).json({ message: "Password don't match!" })

    const isPasswordCorrect = await bcrypt.compare(password, userExits.password);

    if(userExits.changePass && !isPasswordCorrect) return res.status(400).json({ message: "Incorrect password!" })

    const updateUser = await User.findByIdAndUpdate(_id, { password: hashedPassword, changePass: true }, {new: true}).catch(err => res.status(500).json({message: err}))

    return res.status(200).json({
      message: "User is updated",
      result: updateUser
    });
  }

  const updateUser = await User.findByIdAndUpdate(_id, { ...user }, {new: true}).catch(err => res.status(500).json({message: err}))

  return res.status(200).json({
    message: "User is updated",
    result: updateUser
  });

}

export const resendOtp = async(req, res) => {
  const { email } = req.body;

  const user = await Uesr.findOne(email);

  if(!user) return res.status(404).json({message: "User doesn't exists"});

  const OTP = generateOtp();

  const hashedOtp = await bcrypt.hash(OTP.toString(), 12);

  User.findByIdAndUpdate(user._id, { $set: { otp: hashedOtp }}, { new: true }, (err, result) => {
    if(err) {
      return res.status(400).json({message: "Something went wrong."})
    } else {
      return res.status(200).json({result: result})
    }
  })

  try {
    await sendMail({
      to: email,
      OTP: OTP,
    });
  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }

}