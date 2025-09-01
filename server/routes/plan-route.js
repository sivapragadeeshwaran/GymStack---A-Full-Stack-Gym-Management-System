const express = require('express');
const {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
  getPlanById
} = require('../controllers/plancontroller');

const router = express.Router();

router.post("/", createPlan);
router.get("/", getAllPlans);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);
router.get("/:id", getPlanById);

module.exports = router;
