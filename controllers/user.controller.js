import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const googlelClient = new OAuth2Client("732960774937-9dm36clu457k26uugmlg0c1vluold56h.apps.googleusercontent.com")

export const signin = async(req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    if(!existingUser.isVerified) return res.status(400).json({ message: "Uesr is not verified." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: "240h"});

    res.status(200).json({ result: existingUser, token });

  } catch {
    res.status(500).json({ message: "Something went wrong." })
  }
}

export const signup = async(req, res) => {
  const { userName, email, password, confirmPassword  } = req.body;

  try {
    const existingUser = await User.findOne({ email });


    if(existingUser) return res.status(400).json({message: "User already exist."})

    if(password !== confirmPassword) return res.status(400).json({ message: "Password don't match." })

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, userName: userName})

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: "240h"});

    res.status(200).json({ result, token });

  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
}

export const googleLogin = async(req, res) => {
    const { tokenId } = req.body;
    
    googlelClient.verifyIdToken({idToken: tokenId, audience: "732960774937-9dm36clu457k26uugmlg0c1vluold56h.apps.googleusercontent.com"}).then(response => {
      
      const {email_verified: isVerified, name: userName, email, picture: avatar} = response.payload

      if(isVerified) {
        User.findOne({email}).exec(async(err, user) => {
          if(err) {
            return res.status(400).json({
              message: "Something went wrong"
            })
          } else {
            if(user) { 
              const token = jwt.sign({ email: user.email, id: user._id }, 'test', {expiresIn: "240h"});
              if(!user.isVerified) return res.status(400).json({
                message: "User already exists but email is not verified"
              })
              res.status(200).json({ result: user, token });
            } else {
              try {
                const hashedPassword = await bcrypt.hash(email, 12);

                const result = await User.create({ email, password: hashedPassword, userName, isVerified, avatar})

                const token = jwt.sign({ email: email, id: result._id, }, 'test', {expiresIn: "240h"});

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

export const updateUser = async(req, res) => {
  const { id: _id } = req.params;
  console.log("ID", _id)
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No user found with this ID");

  if(req.body?.password) {
    const hashedPassword = await bcrypt.hash(req.body?.password, 12);
    if(req.body?.password !== req.body?.confirmPassword) return res.status(400).json({ message: "Password don't match." })
    const updateUser = await User.findByIdAndUpdate(_id, { ...user,  password: hashedPassword}, {new: true}).catch(err => res.status(500).json({message: err}))

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