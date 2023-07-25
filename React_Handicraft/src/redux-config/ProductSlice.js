import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk("fetchProduct", async () => {
    let response = await axios.get("http://localhost/product/viewproduct")

    console.log(response.data.products);
    return response.data.products;
});

const slice = createSlice({
    name: "Product",
    initialState: {
        Product: []
    }
})