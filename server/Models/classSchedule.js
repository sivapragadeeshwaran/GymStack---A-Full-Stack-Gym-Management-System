const mongoose = require("mongoose");

const classScheduleSchema = new mongoose.Schema({
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], required: true },
  title: { type: String, required: true },
  time: { type: String, required: true }, // e.g., "6:00 AM - 7:00 AM"
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ClassSchedule", classScheduleSchema);
