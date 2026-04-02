const express = require("express");
const authController = require("../controllers/authController");
const { protect, allowedTo } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.get("/myprofile", protect, authController.getMyProfile);

// test authorization
router.get("/admin", protect, allowedTo("admin"), (req, res) => {
  res.send("Welcome Admin");
});

module.exports = router;
