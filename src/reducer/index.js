import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";
import categorySlice from "../slices/categorySlice";



export const rootReducer=combineReducers({
    auth:authSlice,
    profile:profileSlice,
    category:categorySlice,

})

