import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'seller',
    initialState: {
        currentSeller: null
    },
    reducers: {
        setSeller: (state, action) => {
            state.currentSeller = action.payload;
        },

        signOut: (state, action) => {
            state.currentSeller = null;
        }
    }
});

export const { setSeller, signOut } = slice.actions;
export default slice.reducer;