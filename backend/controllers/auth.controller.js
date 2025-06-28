import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateAndSetToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { username, email, password } = await req.body;

  try {
    const isUserExist = await User.findOne({ username });
    const isEmailExist = await User.findOne({ email });

    if (isUserExist || isEmailExist) {
      return res
        .status(400)
        .json({ message: "Username has alread been taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateAndSetToken(newUser._id, res);
      newUser.save();

      res.status(200).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        bio: newUser.bio,
      });
    } else {
      res.status(400).json({
        message: "Filed to create user account",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({
      message: "Server Error - signup failed",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = await req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(404).json({ message: "Invalid Credentials" });


    generateAndSetToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {}
};

export const logout = async (req, res) => {
  try {
    res.cookie("dev_token", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(`Error in logout: `, error);
    res.status(500).json({
      message: "Server Error - Logout Failed",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(`Error in checkAuth auth.controller: `, error);
    res.status(500).json({
      message: "Server Error - authentication failed",
    });
  }
};

export const updateProfilePic = async (req, res) => {
  const { profilePic } = await req.body;
  const user = req.user;
  try {
    if (!profilePic) {
      return res.status(400).json({ message: "Image is required" });
    }

    const cloudinaryResonse = await cloudinary.uploader.upload(profilePic);
    const imageURL = cloudinaryResonse.secure_url;

    const updatedProfile = await User.findByIdAndUpdate(
      user._id,
      { profilePic: imageURL },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(`Error in updateProfile auth.controller: `, error);
    res.status(500).json({
      message: "Server Error - Failed to update profile pic",
    });
  }
};

export const updateProfileInfo = async (req, res) => {
  const { username,bio } = await req.body;
  const user = req.user;
  try {
    if (!bio && !username) {
      return res.status(400).json({ message: "Fields can't be empty." });
    }

    const updatedProfile = await User.findByIdAndUpdate(
      user._id,
      { username,bio },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log(`Error in updateProfileInfo auth.controller: `, error);
    res.status(500).json({
      message: "Server Error - Failed to update bio",
    });
  }
};



