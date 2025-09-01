const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },            // e.g., "Basic", "Premium"
  period: { type: String, required: true },          // e.g., "1 Month", "3 Months", "1 Year"
  price: { type: Number, required: true },            // e.g., 500, 1200
  includesPersonalTraining: { type: Boolean, default: false }          
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);
