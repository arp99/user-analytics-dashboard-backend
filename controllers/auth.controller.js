const { user: User } = require("../Models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    //check if user already exists by the email
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({
        success: false,
        message: "Account already exists with this email!",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "Successfully created user",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create new user!",
      errorMessage: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //search if the user is signed up or not
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found!",
      });
    }

    //compare the passwords
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Passwords not matching, wrong credentials!!",
      });
    }
    //if credentials match then generate access token
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: config.TOKEN_EXPIRY,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login!",
      errorMessage: err.message,
    });
  }
};

const guestLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: "guest@demo.com" });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "guest not found!",
      });
    }

    //if credentials match then generate access token
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, {
      expiresIn: config.TOKEN_EXPIRY,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to login!",
      errorMessage: err.message,
    });
  }
};

module.exports = { signupUser, loginUser, guestLogin };
