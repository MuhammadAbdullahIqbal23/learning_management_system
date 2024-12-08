const express = require("express");
const path = require("path");
const { getDashboardData } = require(path.resolve(__dirname, "../controllers/dashboardController"));

const router = express.Router();

// Route for dashboard data
router.get("/", getDashboardData);

module.exports = router;
