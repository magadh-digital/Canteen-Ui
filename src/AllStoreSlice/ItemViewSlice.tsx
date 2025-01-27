import { createSlice } from "@reduxjs/toolkit";
import { GetOrderTypes, QuantityType } from "../AllTypes";
import { setOrderData } from "./PriceAndQuantitySlice";

interface ItemViewType {
    id: string,
    data: QuantityType[],
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