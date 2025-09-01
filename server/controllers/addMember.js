// controllers/adminController.js
const User = require("../Models/user-model");
const Plan = require("../Models/plan");
const bcrypt =require('bcrypt');

const addMember = async (req, res) => {
  try {
    const {username,email,dateOfBirth,phone,password,membershipPlan,feeStatus} = req.body;
   
    
    const existing = await User.findOne({ email });

      if(phone.length < 10){
          return res.status(404).json({
                success:false,
                message:"Add 10 digit phone Number"
            });
        }

    if (existing) {
      return res.status(400).json({ success: false, message: "Member already exists" });
    }

     const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const plan = await Plan.findById(membershipPlan);  // ✅ expects _id

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Membership plan not found",
      });
    }

  


    const now = new Date(); // Join date
    const expiryDate = new Date(now); // Clone current date
    const period = plan.period.toLowerCase();

    if (period.includes("1 month")) expiryDate.setMonth(expiryDate.getMonth() + 1);
    else if (period.includes("3 month")) expiryDate.setMonth(expiryDate.getMonth() + 3);
    else if (period.includes("6 month")) expiryDate.setMonth(expiryDate.getMonth() + 6);
    else if (period.includes("1 year") || period.includes("12 month")) expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    else {
      return res.status(400).json({
        success: false,
        message: "Unsupported membership period format",
      });
    }

    const member = new User({
      username,
      email,
      phone,
      dateOfBirth,
      role : "user", 
      membershipPlan: plan._id,
      password: hashedPassword,
      addedBy:'admin',
      feePaidDate: now,
      membershipExpiryDate: expiryDate,
      feeStatus:"Paid",
    });

    await member.save();

    res.status(201).json({ success: true, message: "Member added successfully", member });
  } catch (error) {
    console.error("Add Member Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = addMember;