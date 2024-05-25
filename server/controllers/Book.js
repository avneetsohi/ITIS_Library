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

        const booksDetails=await Book.find({ category: { $in: [categoryID] } })
                                     .populate("category");

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
        const {fil,searchVal}=req.body
        var booksDetails
        console.log(fil)
        if(fil==='All'){
            booksDetails=await Book.find({})
                                    .populate("category")
        }else if(fil==='Title'){
            booksDetails=await Book.find({bookTitle:searchVal})
                                    .populate("category")
        }else if(fil==='AUTHOR'){
            booksDetails=await Book.find({author:searchVal})
                                    .populate("category")
        }else if(fil==='YEAR'){
            booksDetails=await Book.find({year:searchVal})
                                    .populate("category")
        }

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

