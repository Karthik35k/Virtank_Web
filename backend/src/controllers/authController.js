import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/User.js";

// Generate JWT Token

const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

};

// ================= REGISTER =================

export const registerUser =
  async (req, res) => {

    try {

      const {
        username,
        email,
        password,
      } = req.body;

      // Check Existing User

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User already exists",
        });

      }

      // Hash Password

      const salt =
        await bcrypt.genSalt(10);

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      // Create User

      const user =
        await User.create({

          username,

          email,

          password:
            hashedPassword,

        });

      // Response

      res.status(201).json({

        _id: user._id,

        username:
          user.username,

        email: user.email,

        role: user.role,

        token:
          generateToken(user._id),

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };

// ================= LOGIN =================

export const loginUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // Find User

      const user =
        await User.findOne({
          email,
        });

      // Check User

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid Credentials",
        });

      }

      // Compare Password

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Credentials",
        });

      }

      // Success Response

      res.status(200).json({

        _id: user._id,

        username:
          user.username,

        email: user.email,

        role: user.role,

        token:
          generateToken(user._id),

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });

    }
  };

export const getMe = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
};

export const updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username?.trim()) {
      return res.status(400).json({ message: "Username cannot be empty" });
    }

    req.user.username = username.trim();
    await req.user.save();

    res.status(200).json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};