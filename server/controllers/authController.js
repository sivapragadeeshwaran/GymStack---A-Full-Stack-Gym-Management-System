const sessionStore = require("../utils/sessionStore");
const sendZobotReply = require("../utils/sendZobotReply");

// STEP 1 → Ask + Save Email
exports.askEmail = (req, res, visitorId, message, session) => {
  if (!message || !message.includes("@")) {
    return sendZobotReply(res, "Please enter your email:");
  }

  sessionStore.set(visitorId, { email: message });

  console.log("📌 Email saved:", sessionStore.get(visitorId));

  return sendZobotReply(res, "Email received! Please enter OTP:");
};

// STEP 2 → OTP Verification
exports.verifyOtp = async (req, res, visitorId, message, session) => {
  sessionStore.set(visitorId, { role: "member" });

  console.log("📌 OTP Verified. Updated session:", sessionStore.get(visitorId));

  return sendZobotReply(res, "OTP verified! Opening member dashboard...");
};
