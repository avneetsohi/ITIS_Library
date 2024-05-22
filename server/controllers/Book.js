const Book = require("../models/Book");

exports.createBook = async(req,res) => {
    try{
        const {title,description,author,year,ratings,downloads,category}=req.body;
    
        const bookResponse = await Book.create({
                                        bookTitle:title, bookDescription:description,
                                        author,year,ratings,downloads,category})

        return res.status(200).json({
            success:true,
            data:bookResponse,
        })
    }catch(error){
        return res.status(400).json({
            error:error.message,
            message:"Unable to make new book"
        })
    }
    
}

exports.getGenreSpecificBooks = async(req,res) => {
    try{
        const {categoryID}=req.body

        if(!categoryID){
            return res.status(400).json({
                success:false,
                message:"Invalid category"
            })
        }

        const booksDetails=await Book.find({category:categoryID})

        return res.status(200).json({
            success:true,
            data:booksDetails,
            message:"Fetched Genre Specific Books Successfully"
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            error:error.message,
            message:"Something went wrong"
        })
    }
}

exports.getAllBooks=async(req,res)=>{
    try{
        const {categoryID}=req.body

        if(!categoryID){
            return res.status(400).json({
                success:false,
                message:"Invalid category"
            })
        }

        const booksDetails=await Book.find()

        return res.status(200).json({
            success:true,
            data:booksDetails,
            message:"Fetched Books Successfully"
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            error:error.message,
            message:"Something went wrong"
        })
    }
}

