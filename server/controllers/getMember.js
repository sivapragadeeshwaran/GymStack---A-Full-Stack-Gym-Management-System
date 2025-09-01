const User = require("../Models/user-model");

const getAllMembers = async (req, res) => {
  try {
   const members = await User.find({ role: "user" }).populate("membershipPlan").select(
      "-password -email -role -dateOfBirth -trainerAssigned -assignedTrainerId -feeStatus -firstLogin -addedBy"
    );

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error while fetching members",
    });
  }
};

module.exports = getAllMembers;
