import { createSlice } from "@reduxjs/toolkit";
import { QuantityType } from "../AllTypes";

interface ItemViewType {
    id: string,
    data: QuantityType[]
}

const initialState: ItemViewType = {
    id: "",
    data: []
}


const ItemViewSlice = createSlice({
    name: 'ItemView',
    initialState,
    reducers: {
        setItemViewId: (state, action) => {
            state.id = action.payload;
        },
        setItemViewData: (state, action) => {
            state.data = action.payload
        }

    },
});


export const { setItemViewId, setItemViewData } = ItemViewSlice.actions
export default ItemViewSlice.reducer