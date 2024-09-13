import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

export const handleUserRegister = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User with this credential already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = new User({ email, username, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", `bearer ${token}`, {
      sameSite: true,
      maxAge: 8640000,
      httpOnly: true,
    });

    return res.status(201).json({ userId: user._id, username: user.username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", `bearer ${token}`, {
      sameSite: true,
      maxAge: 8640000,
      httpOnly: true,
    });

    return res.status(201).json({ userId: user._id, username: user.username });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUsersHandler = async (req, res) => {
  try {
    const users = await User.find({});

    return res.status(200).json({ message: users });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(200)
        .json({ message: "User with this ID doesn't exist" });
    }

    return res
      .status(200)
      .json({ userId: user._id, username: user.username, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleUserUpdate = async (req, res) => {
  try {
    const { userId } = req;
    const {
      username = undefined,
      email = undefined,
      password = undefined,
    } = req.body;

    const updateInfo = {};

    if (username) {
      updateInfo["username"] = username;
    }

    if (email) {
      updateInfo["email"] = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updateInfo["password"] = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updateInfo, {
      new: true,
    });

    return res.status(200).json({ message: "User info updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleUserRemoval = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleUserLogout = async (req, res) => {
  try {
    const { userId } = req;

    res.cookie("auth_token", "");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
