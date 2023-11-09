const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);

      req.user = payload;
      next(); // Move next() here to indicate successful verification
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Invalid Token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is for students",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while checking role",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is not an Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in admin check",
    });
  }
};
