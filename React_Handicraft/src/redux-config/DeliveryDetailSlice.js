import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: "deliveryDetail",
    initialState: {
        deliveryDetail: {}
    },
    reducers: {
        setDeliveryDetail: (state, action) => {
            state.deliveryDetail = action.payload
        }
    }
})

export const { setDeliveryDetail } = slice.actions
export default slice.reducer


