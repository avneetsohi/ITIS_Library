import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import categorySlice from "../slices/categorySlice";
import bookSlice from "../slices/bookSlice";



export const rootReducer=combineReducers({
    auth:authSlice,
    profile:profileSlice,
    category:categorySlice,
    book:bookSlice

})

