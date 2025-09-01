// routes/trainerRoutes.js
const express = require('express')
const {
  createTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} = require("../controllers/trainerController");

const router = express.Router();

router.post("/", createTrainer);      
router.get("/", getAllTrainers);       
router.get("/:id", getTrainerById);     
router.put("/:id", updateTrainer);      
router.delete("/:id", deleteTrainer);   

 module.exports = router;
