import { createSlice } from "@reduxjs/toolkit";

interface AddProductCanteenType {
    canteen_id: string,
}

const initialState: AddProductCanteenType = {
    canteen_id: "",
}

const AddProductCanteenSlice = createSlice({
    name: 'AddProductCanteen',
    initialState,
    reducers: {
        setAddProduct: (state, action) => {
            state.canteen_id = action.payload
        }
    },
})

export const { setAddProduct } = AddProductCanteenSlice.actions
export default AddProductCanteenSlice.reducer