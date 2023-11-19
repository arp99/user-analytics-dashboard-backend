const express = require("express");
const {
  guestLogin,
  loginUser,
  signupUser,
} = require("../controllers/auth.controller");

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/guest-login").post(guestLogin);

module.exports = router;
