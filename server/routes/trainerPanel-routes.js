const express = require("express");
const router = express.Router();
const {getMyTrainerProfile,updateTrainer,addClass,getAllClasses,deleteClassSchedule,updateClassSchedule} = require("../controllers/trainerPanelController");
const verifyToken = require("../middleware/verifyToken"); // adjust path as needed
const isTrainer = require("../middleware/isTrainer");
const multer = require("../middleware/multer");

router.get("/profile", verifyToken,isTrainer, getMyTrainerProfile);
router.put("/trainer/:id", multer.single("profilePic"), updateTrainer);
router.post("/addclass",verifyToken,isTrainer,addClass);
router.get("/getallclasses",verifyToken,isTrainer,getAllClasses);
router.delete("/classschedule/:id",verifyToken,isTrainer,deleteClassSchedule);
router.put("/classschedule/:id",verifyToken,isTrainer,updateClassSchedule);


module.exports = router;
