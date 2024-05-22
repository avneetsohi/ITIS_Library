const crypto=require("crypto")
const User = require("../models/User")
const bcrypt=require("bcrypt")
const mailSender = require("../utils/mailSender")
exports.resetPasswordToken = async(req,res) => {
    try{
        const {email}=req.body

        const user=await User.findOne({email})


        if(!user){
            return res.status(403).json({
                success:false,
                message:"Your email is not registered"
            })
        }

        const token=crypto.randomUUID();
        

        const updatedUserDetails=await User.findOneAndUpdate({email},
                                                             {
                                                                token:token,
                                                                resetPasswordExpires:Date.now() + 5*60*1000
                                                             },{
                                                                new:true
                                                             })

        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(email,"Password Reset",
                        `Your Link for email verification is ${url}. Please click on this url to reset your password.`
        )

        return res.status(200).json({
            success:true,
            message:"Email sent successfully, please check email and change password",
            data:updatedUserDetails

        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while resetting password"
        })
    }
}

exports.resetPassword = async(req,res) => {
    try{
        const {newPassword,confirmNewPassword,token} = req.body

        if (newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match"
            })
        }

        const userDetails=await User.findOne({token})
        console.log(userDetails)

        if(!userDetails){
            return res.status(403).json({
                success:false,
                message:"Token Invalid"
            })
        }else if(Date.now()>userDetails.resetPasswordExpires){
            return res.status(401).json({
                success:false,
                message:'URL has expired, please regenerate your URL'
            })
        }

        const hashedPassword=await bcrypt.hash(newPassword,10)

        await User.findOneAndUpdate({token},{
                                    password:hashedPassword
                                    })
                            
        return res.status(200).json({
            success:true,
            message:'Password reset successful'
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Something went wrong while Password reset'
        })
    }
}