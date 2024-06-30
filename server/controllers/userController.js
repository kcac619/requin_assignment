import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { adminData, viewerData, editorData } from "../data/dummy.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

const registerUserController = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(`registration failed: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(`login failed: ${error.message}`);
    return res.status(500).json({ message: error.message });
  }
};

const dashboardController = (req, res) => {
  let dashdata = "default";
  if (req.user.role === "admin") {
    dashdata = adminData;
  }
  if (req.user.role === "editor") {
    dashdata = editorData;
  }
  if (req.user.role === "viewer") {
    dashdata = viewerData;
  }
  return res
    .status(200)
    .json({ message: "Dashboard", user: req.user, dashdata });
};

export { registerUserController, loginUserController, dashboardController };
