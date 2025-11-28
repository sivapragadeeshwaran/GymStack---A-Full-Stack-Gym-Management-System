const User = require("../Models/user-model");
const Plan = require("../Models/plan");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { username, email, role, password, dateOfBirth, phone } = req.body;

    let { membershipPlan, feeStatus } = req.body;

    membershipPlan = membershipPlan || null;
    feeStatus = feeStatus || "Pending";

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    if (role === "user" && feeStatus === "Pending") {
      return res.status(400).json({
        success: false,
        message: "Pay the fees",
      });
    }

    if (phone.length < 10) {
      return res.status(404).json({
        success: false,
        message: "Add 10 digit phone Number",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let feePaidDate = null;
    let membershipExpiryDate = null;

    // If paid, calculate dates
    if (feeStatus === "Paid" && membershipPlan) {
      const plan = await Plan.findById(membershipPlan);
      if (!plan) {
        return res.status(404).json({
          success: false,
          message: "Membership plan not found",
        });
      }

      const now = new Date();
      feePaidDate = now;
      membershipExpiryDate = new Date(now);

      const period = plan.period.toLowerCase();

      if (period.includes("1 month"))
        membershipExpiryDate.setMonth(now.getMonth() + 1);
      else if (period.includes("3 month"))
        membershipExpiryDate.setMonth(now.getMonth() + 3);
      else if (period.includes("6 month"))
        membershipExpiryDate.setMonth(now.getMonth() + 6);
      else if (period.includes("1 year") || period.includes("12 month"))
        membershipExpiryDate.setFullYear(now.getFullYear() + 1);
      else {
        return res.status(400).json({
          success: false,
          message: "Unsupported membership period format",
        });
      }
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      dateOfBirth,
      membershipPlan,
      feeStatus,
      phone,
      feePaidDate,
      membershipExpiryDate,
      addedBy: "online",
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: " new user added successfully 🚀",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "failed to add user",
      });
    }
  } catch (e) {
    console.log("Error : ", e);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "username or password not matched" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.USER_SECRET_KEY,
      { expiresIn: "60d" }
    );

    // Fixed cookie settings
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction, // true in production, false in development
      sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
      maxAge: 60 * 24 * 60 * 60 * 1000,
      domain: isProduction ? ".yourdomain.com" : "localhost", // Adjust as needed
    });

    // IMPORTANT: Return the token in the response body
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token, // Add this line to return the token in the response
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        assignedTrainerId: user.assignedTrainerId,
        addedBy: user.addedBy,
      },
    });
  } catch (e) {
    console.log("Error:", e);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Add this function to your user controller
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        assignedTrainerId: user.assignedTrainerId,
        addedBy: user.addedBy,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// Update your module.exports to include this function
module.exports = {
  userRegister,
  userlogin,
  verifyToken,
};
