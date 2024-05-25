const mongoose = require("mongoose")


const booksSchema = new mongoose.Schema({
  bookTitle: { type: String },
  bookDescription: { type: String },
  author: {
    type: [String],
    required: true,
  },
  year:{
    type:Number,
    required:true
  },
  ratings: {
    type:Number,
    required:true
  },
  downloads:{
    type:Number
  },
  thumbnail: {
    type: String,
  },
  category: {
    
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Category"
  },
  createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model("Book", booksSchema)
