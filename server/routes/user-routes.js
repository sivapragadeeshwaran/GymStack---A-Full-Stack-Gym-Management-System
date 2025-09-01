
const express = require("express");
const router = express.Router();
const { getUserProfile,assignTrainerToUser,getAllTrainers,getAllClasses,upgradeMembership} = require("../controllers/UserController");
const verifyToken = require("../middleware/verifyToken");
const isUser = require("../middleware/isUser");

router.get("/profile", verifyToken,isUser,getUserProfile);
router.post("/assignTrainerToUser",verifyToken,isUser,assignTrainerToUser);
router.get("/getAllTrianers",verifyToken,isUser,getAllTrainers);
router.get("/getClasses",verifyToken,isUser,getAllClasses);
router.post("/upgrade", verifyToken,isUser, upgradeMembership);

module.exports = router;
