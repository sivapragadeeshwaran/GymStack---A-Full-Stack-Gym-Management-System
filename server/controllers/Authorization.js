const User = require('../Models/user-model');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const userRegister = async(req,res) => {
    try{
       // console.log("req",req.body)
        const {username,email,role,password,dateOfBirth} = req.body;
        
      let { membershipPlan, feeStatus } = req.body;

          membershipPlan = membershipPlan || null;
           feeStatus = feeStatus || "Pending";
        const userExist = await User.findOne({email});
        if(userExist){
          return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }

        if(role === 'user' && feeStatus === 'Pending'){
            return res.status(400).json({
                success:false,
                message:"Pay the fees"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({username,email,password:hashedPassword,role,dateOfBirth,membershipPlan,feeStatus});

        if(newUser){
            res.status(201).json({
                success:true,
                message:" new user added successfully 🚀"
            });
        }else{
            res.status(404).json({
                success:false,
                message:"failed to add user"
            });
        }


    }catch(e){
        console.log("Error : ",e);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

const userlogin = async(req,res) => {
    try{
        console.log(req.body);

        const {email,password,firstLogin} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"username or password not matched"
            })
        }

        const accessToken = jwt.sign({
            user_id : user._id,
            username: user.username,
            role: user.role,
            firstLogin: user.firstLogin
        },process.env.USER_SECRET_KEY,{
            expiresIn:"15m"
        });

        res.status(201).json({
            success:true,
            message:"user logined successfully",
            accessToken,
            user:{
             user_id : user._id,
            username: user.username,
            role: user.role,
            firstLogin: user.firstLogin
            }
        });



    }catch(e){
        console.log("Error : ",e);
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports ={
    userRegister,userlogin
}