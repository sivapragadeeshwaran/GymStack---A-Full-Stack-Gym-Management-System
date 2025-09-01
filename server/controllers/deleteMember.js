// DELETE MEMBER
const User = require("../Models/user-model");
const deleteMember = async (req, res) => {
  try {
    const memberId = req.params.id;

    const deleted = await User.findByIdAndDelete(memberId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = deleteMember;