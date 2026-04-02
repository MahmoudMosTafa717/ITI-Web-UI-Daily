const User = require("../models/userModel");
const { verifyToken } = require("../utils/jwt");

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id);

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  req.user = user;
  next();
};

/// AUTHORIZATION
exports.allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not allowed",
      });
    }

    next();
  };
};
