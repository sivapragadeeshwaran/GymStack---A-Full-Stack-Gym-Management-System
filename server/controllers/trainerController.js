// controllers/trainerController.js
const express = require('express');
const Trainer = require("../Models/trainer-model");
const User = require("../Models/user-model");
const bcrypt =require('bcrypt');

const createTrainer = async (req, res) => {
  try {
    const { name, email, password, phone, experience, specialization } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({
  $or: [{ email }, { username:name }]
});

    if (existingUser) {
      return res.status(400).json({ message: "User with this email or name already exists." });
    }
    

    // 1. Create User
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: name,
      email,
      password: hashedPassword,
     phone,
      role: "trainer",
    });

    // 2. Create Trainer and link with userId
    const trainer = await Trainer.create({
  userId: user._id,
  name,
  experience,
  specialization,
});

    res.status(201).json({
      message: "Trainer and user created successfully.",
      trainer,
      userId: user._id
    });

  } catch (err) {
    console.error("Create Trainer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

 const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find().populate("userId", "phone").populate("assignedMembers");
    res.status(200).json({ success: true, data: trainers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

 const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id).populate("userId").populate("assignedMembers");
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });
    res.status(200).json({ success: true, data: trainer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// controller/trainerController.js
const updateTrainer = async (req, res) => {
  try {
    const { name, phone, experience, specialization } = req.body;

    // First update user details (phone, name) if needed
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });

    const user = await User.findById(trainer.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    await user.save();

    // Then update trainer details
    trainer.name = name || trainer.name;
    trainer.experience = experience || trainer.experience;
    trainer.specialization = specialization || trainer.specialization;
    await trainer.save();

    res.status(200).json({ success: true, message: "Trainer updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


 const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: "Trainer not found" });
    res.status(200).json({ success: true, message: "Trainer deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = {createTrainer,getAllTrainers, deleteTrainer,getTrainerById,updateTrainer}