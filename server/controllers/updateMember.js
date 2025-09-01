// UPDATE MEMBER
const User = require("../Models/user-model");
const Plan = require("../Models/plan");
const updateMember = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updateData = req.body;

    // Prevent updating sensitive fields
    delete updateData.password;
    delete updateData.role;

    if (updateData.membershipPlan) {
      const plan = await Plan.findById(updateData.membershipPlan);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Membership plan not found",
        });
      }

      // Set new feePaidDate (joining date)
      const now = new Date();
      updateData.feePaidDate = now;

      // Calculate expiry date
      const expiryDate = new Date(now);
      const period = plan.period.toLowerCase();

      if (period.includes("1 month")) expiryDate.setMonth(expiryDate.getMonth() + 1);
      else if (period.includes("3 month")) expiryDate.setMonth(expiryDate.getMonth() + 3);
      else if (period.includes("6 month")) expiryDate.setMonth(expiryDate.getMonth() + 6);
      else if (period.includes("1 year") || period.includes("12 month")) {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      } else {
        return res.status(400).json({
          success: false,
          message: "Unsupported membership period format",
        });
      }

      updateData.membershipExpiryDate = expiryDate;
    }



    const updatedMember = await User.findByIdAndUpdate(
      memberId,
      updateData,
      { new: true, runValidators: true }
    ).select(
      "-password -email -role -dateOfBirth -trainerAssigned -assignedTrainerId -feeStatus -firstLogin -addedBy"
    );

    if (!updatedMember) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({ success: true, message: "Member updated", member: updatedMember });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = updateMember