const Trainer = require("../Models/trainer-model");
const User = require("../Models/user-model");
const ClassSchedule = require("../Models/classSchedule");
const cloudinary = require("../utils/cloudinary");

const getMyTrainerProfile = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const trainerId = req.user.userId;
    const trainer = await Trainer.findOne({ userId: trainerId }).populate(
      "assignedMembers"
    );

    if (!trainer) {
      return res
        .status(404)
        .json({ success: false, message: "Trainer not found" });
    }

    res.status(200).json({ success: true, data: trainer });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const updateTrainer = async (req, res) => {
  try {
    const trainerId = req.params.id;
    const { name, phone, experience, specialization } = req.body;

    let profilePicUrl = req.body.profilePic;

    // If image file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "trainer_profiles",
      });
      profilePicUrl = result.secure_url;
    }

    const updatedTrainer = await Trainer.findByIdAndUpdate(
      trainerId,
      {
        name,
        phone,
        experience,
        specialization,
        profilePic: profilePicUrl,
      },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedTrainer });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

const addClass = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const trainerId = req.user.userId;
    const { day, title, time, note } = req.body;

    if (!trainerId || !day || !title || !time) {
      return res
        .status(400)
        .json({ error: "All fields are required except note" });
    }

    const newClass = new ClassSchedule({
      trainerId: trainerId,
      day,
      title,
      time,
      note,
    });

    await newClass.save();

    res
      .status(201)
      .json({ message: "Class created successfully", data: newClass });
  } catch (err) {
    console.error("Error adding class:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    // FIXED: Changed from user_id to userId
    const trainerId = req.user.userId;
    const classes = await ClassSchedule.find({ trainerId }).populate(
      "trainerId",
      "name"
    );
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching class schedules:", error);
    res.status(500).json({ message: "Failed to get class schedules" });
  }
};

const deleteClassSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSchedule = await ClassSchedule.findByIdAndDelete(id);

    if (!deletedSchedule) {
      return res.status(404).json({ message: "Class schedule not found" });
    }

    res.status(200).json({ message: "Class schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting class schedule:", error);
    res.status(500).json({ message: "Failed to delete class schedule" });
  }
};

const updateClassSchedule = async (req, res) => {
  try {
    const classId = req.params.id;
    const updateData = req.body;

    const updatedClass = await ClassSchedule.findByIdAndUpdate(
      classId,
      updateData,
      { new: true } // return updated document
    );

    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res
      .status(200)
      .json({ message: "Class updated successfully", updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).json({ message: "Failed to update class" });
  }
};

module.exports = {
  getMyTrainerProfile,
  updateTrainer,
  addClass,
  getAllClasses,
  deleteClassSchedule,
  updateClassSchedule,
};
