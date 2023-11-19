const jwt = require("jsonwebtoken");
const { user: userList } = require("../Models");
const config = require("../config")

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized message! Token missing",
      });
    }
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const isUserExists = await userList.find({ email: decoded.email });
    if (isUserExists) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Error in authenticating",
      });
    }
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access! token error",
      errorMessage: err.message,
    });
  }
};

module.exports = { isAuthenticated };
