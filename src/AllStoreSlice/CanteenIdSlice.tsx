import { createSlice } from "@reduxjs/toolkit";
import { CanteenData } from "../AllTypes";

interface CanteenDataState {
    canteenData: CanteenData;
}

const initialState: CanteenDataState = {
    canteenData: {
        id: "",
        name: "",
        location: "",
        description: "",
        contact: 0,
        image_url: "",
        created_at: "",
        updated_at: "",
        email: "",
        password: "",
    } 
}


const CanteenDataSlice = createSlice({
    name: "canteenData",
    initialState ,
    reducers: {
        setCanteenDataSlice: (state, action) => {
            state.canteenData = action.payload;
        },
    },
});

export const { setCanteenDataSlice } = CanteenDataSlice.actions;
export default CanteenDataSlice.reducer