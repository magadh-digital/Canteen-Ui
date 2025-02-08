import { createSlice } from "@reduxjs/toolkit";
import { GetOrderTypes,  } from "../AllTypes";

interface ItemViewType {
    id: string,
    data: GetOrderTypes[],
    order:GetOrderTypes | null
}

const initialState: ItemViewType = {
    id: "",
    data: [],
    order:null
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
        },
        setOrderDetails: (state, action) => {
            state.order = action.payload
        }
    },
});


export const { setItemViewId, setItemViewData, setOrderDetails } = ItemViewSlice.actions
export default ItemViewSlice.reducer