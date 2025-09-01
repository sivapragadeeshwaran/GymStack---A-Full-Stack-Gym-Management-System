const User = require("../Models/user-model");
const Trainer = require("../Models/trainer-model");
const cron = require("node-cron");

// ------------------------------
// ASSIGN TRAINER TO USER
// ------------------------------
const assignTrainerToUser = async (req, res) => {
  try {
    const { userId, trainerId } = req.body;

    if (!userId || !trainerId) {
      return res
        .status(400)
        .json({ message: "User ID and Trainer ID are required." });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check if fee is paid
    if (user.feeStatus !== "Paid") {
      return res
        .status(400)
        .json({
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

      // Remove user from trainer’s assignedMembers
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

// ------------------------------
module.exports = {
  assignTrainerToUser,
};
