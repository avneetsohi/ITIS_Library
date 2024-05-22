const { Router } = require("express");

const { signup, login, sendOTP } = require("../controllers/Auth");
const { createBook, getGenreSpecificBooks, getAllBooks } = require("../controllers/Book");
const { resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");
const { createCategory, getAllCategories } = require("../controllers/Category");

const router=Router();

// Authentication Routes
router.post("/auth/signup",signup)
router.post("/auth/login",login)
router.post("/auth/verify-otp",sendOTP)

// Book Routes
router.post("/book/create-book",createBook)
router.get("/book/get-genre-books",getGenreSpecificBooks)
router.get("/book/get-all-books",getAllBooks)

// Reset Password Routes
router.post("/auth/reset-password-token",resetPasswordToken)
router.post("/auth/reset-password",resetPassword)

// Category Routes
router.post("/category/create-category",createCategory)
router.get("/category/get-all-categories",getAllCategories)



module.exports=router;