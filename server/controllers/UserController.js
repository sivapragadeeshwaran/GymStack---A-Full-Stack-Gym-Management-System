const User = require("../Models/user-model");
const Plan = require("../Models/plan");
const cron = require("node-cron");
const Trainer = require("../Models/trainer-model");
const ClassSchedule = require("../Models/classSchedule");
const mongoose = require("mongoose");

const getUserProfile = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select("-password")
      .populate("membershipPlan");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Calculate age from dateOfBirth
    let age = null;
    if (user.dateOfBirth) {
      const dob = new Date(user.dateOfBirth);
      const today = new Date();
      age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
    }

    // Build response
    const profileData = {
      username: user.username,
      age: age || "Not Provided",
      membershipStatus: user.feeStatus === "Paid" ? "Active" : "Inactive",
      personalTrainer: user.assignedTrainerId ? "Available" : "Not Assigned",
      membership: {
        name: user.membershipPlan?.name || "No Plan",
        period: user.membershipPlan?.period || "-",
        price: user.membershipPlan?.price || "-",
        startDate: user.feePaidDate,
        expiryDate: user.membershipExpiryDate,
      },
    };

    res.json({ success: true, data: profileData });
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------------------
// ASSIGN TRAINER TO USER
// ------------------------------
const assignTrainerToUser = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const userId = req.user.userId;
    const { trainerId } = req.body;

    if (!userId || !trainerId) {
      return res
        .status(400)
        .json({ message: "User ID and Trainer ID are required." });
    }

    // Find user
    const user = await User.findById(userId).populate("membershipPlan");
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check if fee is paid
    if (user.feeStatus !== "Paid") {
      return res.status(400).json({
        message: "User must have a paid membership to assign a trainer.",
      });
    }

    // Check if membership is expired
    if (
      user.membershipExpiryDate &&
      new Date(user.membershipExpiryDate) < new Date()
    ) {
      return res
        .status(400)
        .json({ message: "User's membership has expired." });
    }

    // Find trainer
    const trainer = await Trainer.findById(trainerId);
    if (!trainer)
      return res.status(404).json({ message: "Trainer not found." });

    // Check if already assigned
    if (user.assignedTrainerId?.toString() === trainerId) {
      return res
        .status(400)
        .json({ message: "Trainer already assigned to this user." });
    }

    const plan = await Plan.findById(user.membershipPlan);
    if (!plan)
      return res.status(404).json({ message: "Membership plan not found." });

    if (!plan.includesPersonalTraining) {
      return res.status(400).json({
        message: "This membership plan does not include personal training.",
      });
    }

    // Assign trainer
    user.assignedTrainerId = trainerId;
    user.trainerAssigned = "Yes";
    await user.save();

    // Add user to trainer's assignedMembers
    if (!trainer.assignedMembers.includes(user._id)) {
      trainer.assignedMembers.push(user._id);
      await trainer.save();
    }

    return res.status(200).json({ message: "Trainer assigned successfully." });
  } catch (error) {
    console.error("Error assigning trainer:", error);
    return res
      .status(500)
      .json({ message: "Server error while assigning trainer." });
  }
};

// ------------------------------
// CRON JOB: AUTO UNASSIGN TRAINERS FOR EXPIRED USERS
// ------------------------------
cron.schedule("30 0 * * *", async () => {
  try {
    const today = new Date();

    // Find users whose membership expired & have trainer assigned
    const expiredUsers = await User.find({
      membershipExpiryDate: { $ne: null, $lt: today },
      assignedTrainerId: { $ne: null },
    });

    for (const user of expiredUsers) {
      const trainerId = user.assignedTrainerId;

      // Remove user from trainer's assignedMembers
      await Trainer.findByIdAndUpdate(trainerId, {
        $pull: { assignedMembers: user._id },
      });

      // Reset trainer in user
      user.assignedTrainerId = null;
      user.trainerAssigned = "Self";
      await user.save();
    }
  } catch (error) {
    console.error("❌ Error in Trainer Auto-Unassign Cron Job:", error);
  }
});

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find()
      .select("name experience specialization profilePic assignedMembers")
      .populate("assignedMembers", "_id"); // Just to count length

    const formatted = trainers.map((trainer) => ({
      _id: trainer._id,
      name: trainer.name,
      experience: trainer.experience,
      specialization: trainer.specialization,
      profilePic: trainer.profilePic,
      assignedMemberCount: trainer.assignedMembers.length,
    }));

    res.status(200).json({ success: true, trainers: formatted });
  } catch (err) {
    console.error("Error fetching trainers:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch trainers" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const userId = req.user.userId;

    // Step 1: Get the user
    const user = await User.findById(userId);
    if (!user || !user.assignedTrainerId) {
      return res
        .status(404)
        .json({ message: "No trainer assigned to this user." });
    }

    // Step 2: Get the trainer
    const trainer = await Trainer.findById(user.assignedTrainerId);
    if (!trainer) {
      return res.status(404).json({ message: "Assigned trainer not found." });
    }

    // Step 3: Find class schedules using trainer.userId
    const classes = await ClassSchedule.find({ trainerId: trainer.userId })
      .populate("trainerId", "name profilePic specialization")
      .sort({ day: 1, time: 1 });

    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching class schedules:", error);
    res.status(500).json({ message: "Failed to get class schedules" });
  }
};

const upgradeMembership = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const userId = req.user.userId;
    const { newPlanId, forceUpgrade } = req.body;

    if (!mongoose.Types.ObjectId.isValid(newPlanId)) {
      return res.status(400).json({ message: "Invalid plan ID" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const plan = await Plan.findById(newPlanId);
    if (!plan)
      return res.status(404).json({ message: "Selected plan not found" });

    const today = new Date();
    const expiryDate = new Date(user.membershipExpiryDate || today);
    const diffInDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

    // If membership is still valid and user has not opted for force upgrade
    if (expiryDate > today && diffInDays > 2 && !forceUpgrade) {
      return res.status(400).json({
        message:
          "Your current plan is still active. Do you want to cancel and upgrade?",
        canUpgrade: true,
        daysRemaining: diffInDays,
      });
    }

    // 👇 Always start from today (not future expiry date)
    const baseDate = today;
    let newExpiryDate = new Date(baseDate);

    if (plan.period.toLowerCase().includes("month")) {
      const months = parseInt(plan.period);
      newExpiryDate.setMonth(newExpiryDate.getMonth() + months);
    } else if (plan.period.toLowerCase().includes("year")) {
      const years = parseInt(plan.period);
      newExpiryDate.setFullYear(newExpiryDate.getFullYear() + years);
    }

    // Update user membership details
    user.membershipPlan = newPlanId;
    user.feeStatus = "Paid";
    user.feePaidDate = today;
    user.membershipExpiryDate = newExpiryDate;
    user.assignedTrainerId = null;

    await user.save();

    return res
      .status(200)
      .json({ message: "Membership upgraded successfully", newExpiryDate });
  } catch (err) {
    console.error("Upgrade Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  assignTrainerToUser,
  getAllTrainers,
  getAllClasses,
  upgradeMembership,
};
