const express = require("express");
const router = express.Router();
const { getMonthlyRevenue,getMembershipDistribution,getDashboardStats,trainersData } = require("../controllers/dashboard");

// @route   GET /api/analytics/monthly-revenue
// @desc    Get revenue for the last 6 months
// @access  Private/Admin (add auth middleware if needed)
router.get("/monthly-revenue", getMonthlyRevenue);
router.get("/membership-distribution", getMembershipDistribution);
router.get("/dashboard-stats", getDashboardStats);
router.get("/load",trainersData);

module.exports = router;
