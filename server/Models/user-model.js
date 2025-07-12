const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["admin", "trainer", "user"],
    default: "user"
  },

  dateOfBirth: {
    type: Date,
    required: true
  },

  membershipPlan: {
    type: String,
    enum: ["Monthly", "Quarterly", "Yearly"],
    default: null
  },

  trainerAssigned: {
    type: String,
    enum: ["Yes", "Self"],
    default: "Self"
  },

  assignedTrainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    default: null
  },

  feeStatus: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  },

  feePaidDate: {
    type: Date,
    default: null
  },

  membershipExpiryDate: {
    type: Date,
    default: null
  },

  firstLogin: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("User", userSchema);
