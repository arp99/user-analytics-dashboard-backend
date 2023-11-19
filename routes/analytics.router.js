const express = require("express");
const { getAnalytics } = require("../controllers/analytics.controller");
const { isAuthenticated } = require("../middlewares/authentication");

const router = express.Router();

router.route("/").get(isAuthenticated, getAnalytics);

module.exports = router;
