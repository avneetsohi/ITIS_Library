// Import the Mongoose library
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
  {
    
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    
    accountType: {
      type: String,
      enum: ["Admin", "Customer"],
      required: true,
      default:"Customer"
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },

  },
  { timestamps: true }
)


module.exports = mongoose.model("user", userSchema)
