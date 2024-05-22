const jwt=require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// auth
exports.auth = async(req,res,next) => {
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // if token missing, then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            })
        }

        // verify token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user=decode;
            
        }catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
        next();
        
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token"
        })
    }
}


// Authorization for API routes
exports.isCustomer = async(req,res,next) => {
    try{
        if(req.user.accountType!=='Customer'){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for students only'
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:"User's role cannot be verified, please try again"
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType!=='Admin'){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admins only'
            })
        }
        next();
    }catch(error){
        res.status(500).json({
            success:false,
            message:"User's role cannot be verified, please try again"
        })
    }
}