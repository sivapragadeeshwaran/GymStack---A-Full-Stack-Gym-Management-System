const jwt = require("jsonwebtoken");
const User = require("../Models/user-model");
const bcrypt =require('bcrypt');


const forgetPassword = async(req,res) => {
    try{
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email does not exist",
      });
    }

    // Generate reset token with userId, valid for 10 minutes
    const resetToken = jwt.sign({ userId: user._id }, process.env.USER_SECRET_KEY, {
      expiresIn: "10m",
    });

    // Send this token to frontend (for now)
    return res.status(200).json({
      success: true,
      message: "User found. Redirect to change password page.",
      token: resetToken, // send this to frontend
    });


    }catch(error){
       return res.status(500).json({
            success:false,
            message:"User is not found"
        })
    }
} 


const resetPassword = async(req,res) => {
    try{
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
         const user = await User.findById(decoded.userId);
       if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
       }

       let hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });


    }catch(error){
         return res.status(500).json({
            success:false,
            message:"User is not found"
        });
    }
}


module.exports = {forgetPassword,resetPassword}