const Plan = require("../Models/plan");

// Create Plan
 const createPlan = async (req, res) => {
  try {
    const { name, period, price,includesPersonalTraining } = req.body;
    const newPlan = new Plan({ name, period, price,includesPersonalTraining });
    await newPlan.save();
   res.status(201).json({
  success: true,
  message: "Plan created successfully",
  data: newPlan
});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Plans
 const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({
      success: true,
  data: plans
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Plan
 const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Plan
 const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.status(200).json({success:true, message: "Plan deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Error fetching plan:", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {deletePlan,updatePlan,getAllPlans,createPlan,getPlanById}
