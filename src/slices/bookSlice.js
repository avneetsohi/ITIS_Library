import { createSlice } from "@reduxjs/toolkit"

const initialState={
    bookDetails:null,
    previewStatus:false 
}

const bookSlice=createSlice({
    name:"book",
    initialState:initialState,
    reducers:{
        setBook:(state,action)=>{
            state.bookDetails=action.payload
        },
        setPreviewStatus:(state,action)=>{
            state.previewStatus=action.payload
        }
    }
})

export const  {setBook,setPreviewStatus} = bookSlice.actions;
export default bookSlice.reducer
