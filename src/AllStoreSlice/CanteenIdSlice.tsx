import { createSlice } from "@reduxjs/toolkit";


const CanteenIdSlice = createSlice({
    name: "canteenId",
    initialState: {
        canteenId: "",
    },
    reducers: {
        setCanteenIdURl: (state, action) => {
            state.canteenId = action.payload;
        },
    },
});

export const { setCanteenIdURl } = CanteenIdSlice.actions;
export default CanteenIdSlice.reducer