const express = require("express");
const router = express.Router();
const { handleZobot } = require("../controllers/zobotController");

router.post("/zobot", handleZobot);

module.exports = router;
