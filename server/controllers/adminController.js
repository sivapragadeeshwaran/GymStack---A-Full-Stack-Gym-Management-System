const User = require("../Models/user-model");
const bcrypt = require("bcrypt");

// Add new admin (with hashed password)
const addAdmin = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      addedBy: "admin",
    });

    await newAdmin.save();
    res.status(201).json({ success: true, data: newAdmin });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

// Get all admins (includes hashed password for demo — not recommended)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: admins
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete admin
const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin || admin.role !== "admin") {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addAdmin,
  getAllAdmins,
  deleteAdmin,
};
