const User = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

/// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = generateToken({ id: user._id });

    res.status(201).json({
      message: "User created",
      token,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
};

/// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken({ id: user._id });

    res.json({
      message: "Logged in",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error",
      error: err.message,
    });
  }
};

/// GET MY PROFILE
exports.getMyProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    data: user,
  });
};
