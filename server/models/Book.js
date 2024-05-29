const mongoose = require("mongoose")


const booksSchema = new mongoose.Schema({
  bookTitle: { type: String },
  bookDescription: { type: String },
  author: {
    type: String,
    required: true,
  },
  year:{
    type:String,
    required:true
  },
  ratings: {
    type:Number,
    required:true
  },
  downloads:{
    type:Number
  },
  accessLink:{
    type:String
  },
  accessID:{
    type:String
  },
  thumbnail: {
    type: String,
  },
  filePath:{
    type:String,
    required:true
  },
  category: [
    {
    
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:"Category"
    }
  ],
  createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model("Book", booksSchema)
