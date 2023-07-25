import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategory=createAsyncThunk("fetchCategory",async()=>{
    let response=await axios.get("http://localhost:3000/category/category-list")
  
    console.log(response.data.categories)
    return response.data.categories
})  
const slice=createSlice({
    name:"category",
    initialState:{
        categoryList:[],
        error:null,
        isLoading:false
    },extraReducers:(builder)=>{
        builder.addCase(fetchCategory.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(fetchCategory.fulfilled,(state,action)=>{
            state.categoryList=action.payload
        })
        builder.addCase(fetchCategory.rejected,(state,action)=>{
            state.isLoading=true
            state.error="Something went wrong"
        })
    }
})  

export default slice.reducer