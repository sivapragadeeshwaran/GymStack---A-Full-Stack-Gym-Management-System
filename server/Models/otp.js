const mongoose = require("mongoose");
const crypto = require("crypto");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// Auto-delete when expired
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to generate hashed OTP
otpSchema.statics.hashOtp = function (otp) {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

module.exports = mongoose.model("Otp", otpSchema);
