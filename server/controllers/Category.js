const Category = require("../models/Category")

exports.createCategory = async(req,res) => {
    try{
        const {name,description}=req.body

        // data validation
        if (!name || !description){
            return res.status(400).json({
                success:false,
                message:"Name & description are required"
            })
        }

        const categoryResponse=await Category.create({name,description})

        return res.status(200).json({
            success:true,
            data:categoryResponse,
            message:"Category Created"
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            error:error.message,
            message:"Something went wrong"
        })
    }
}


exports.getAllCategories = async (req,res) => {
    try{
        const categories=await Category.find();

        return res.status(200).json({
            success:true,
            data:categories,
            message:"Fetched All Categories"
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Something went wrong"
        })  
    }
}

exports.getCategory = async(req,res) => {
    try{
        const {genreName}=req.body

        const categoryResponse=await Category.find({name:genreName})

        return res.status(200).json({
            success:true,
            data:categoryResponse,
            message:"Fetched the Category"
        })

    }catch(error){
        console.log(error.message)
        return res.status(400).json({
            success:false,
            error:"Something went wrong"
        })
    }
}