const Otp = require("../models/OTP");
const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require("bcrypt")
const otpGenerator=require("otp-generator")
const jwt=require("jsonwebtoken")



exports.sendOTP = async(req,res) => {
    try{

        // fetch email from req's body
        const {email} = req.body; 
        // check if email field is missing
        if(!email){
            return res.status(401).json({
                success:false,
                message:"All fields are required"
            })  
        }

        if(!email.includes('@')){
            return res.status(401).json({
                success:false,
                message:"Email is not valid"
            })  
        }

        // check if user exists
        const checkUserPresent=await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            }) 
        }

        // generate otp
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("OTP generated:",otp);

        // Check unique OTP or not
        var result = await Otp.findOne({otp:otp})

        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result = await Otp.findOne({otp:otp})
        }

        //CREATE db entry for OTP
        const otpEntry=await Otp.create({
            email,otp
        })
        console.log(otpEntry);

        // return resposne
        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            otp:otp
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// signup
exports.signup = async(req,res) => {

    try{
        const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body

        // data validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType){
            return res.status(403).json({
                success:false,
                message:'All fields are required'
            })
        }

        // email validation
        if(!email.includes('@')){
            return res.status(401).json({
                success:false,
                message:"Email is not valid"
            })  
        }

        // check user already exists
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exists, please log in to continue"
            })
        }

        // match the passwords
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password does not match, please try again'
            })
        }

        // find most recent OTP stored for the user
        const recentOtp=await Otp.find({email:email}).sort({createdAt:-1}).limit(1);
        console.log("Recent Otp:",recentOtp);

        // validate OTP
        if(recentOtp.length==0){
            // otp not found
            return res.status(400).json({
                success:false,
                message:'OTP not found'
            })
        }else if(otp!==recentOtp[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success:false,
                message:'Invalid OTP'
            })
        }


        // HASH PASSWORD
        const hashedPassword=await bcrypt.hash(password,10);
        
        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        // CREATE ENTRY IN DB
        const user=await User.create({
            firstName,lastName,email,
            password:hashedPassword,accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return response
        return res.status(200).json({
            success:true,
            message:'User registered successfully',
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }




}


// login
exports.login = async(req,res) => {

    try{
        // fetch data from req body
        const {email,password}=req.body;

        // validate fetched data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All fields are required'
            })
        }

        if(!email.includes('@')){
            return res.status(401).json({
                success:false,
                message:"Email is not valid"
            })  
        }

        //check user exist or not
        const user= await User.findOne({email})
                                .populate("additionalDetails")
                                .exec()

        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered, please sign up to continue'
            })
        }

        if(await bcrypt.compare(password,user.password)){
            const payload={
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            let token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            })
            user.token=token
            user.password=undefined

            // create cookie and send resposne
            const options={
                expires: new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect'
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Log In failed, please try again"
        })
    }

    
}
