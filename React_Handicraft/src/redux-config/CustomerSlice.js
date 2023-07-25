import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import api from "../WebApi/api";

export const fetchUser = createAsyncThunk("/admin/singin", async (email) => {
    try {
        let response = await axios.post(api.CUSTOMER_SIGNIN, { email });
        console.log(response)
        if (response.data.status)
            return response.data.customer
    } catch (err) {
        console.log(err);
    }
})

const slice = createSlice({
    name: "customer",
    initialState: {
        currentCustomer: null
    },
    reducers: {
        setCustomer: (state, action) => {
            state.currentCustomer = action.payload
        },
        signOut: (state, action) => {
            state.currentCustomer = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.admin = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = "Oops! something went wrong"

        })
    }
})

export const { setCustomer, signOut } = slice.actions
export default slice.reducer;

