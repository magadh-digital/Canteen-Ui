import { createSlice } from "@reduxjs/toolkit";
import { MenuItemType } from "../AllTypes";

export interface PriceAndQuantityStateType {
    price: number,
    quantity: number,
    orderData: MenuItemType[]
}

const PriceAndQuantitySlice = createSlice({
    name: 'PriceAndQuantity',
    initialState: {
        price: 0,
        quantity: 0,
        orderData: []
    },
    reducers: {
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setOrderData: (state, action) => {
            state.orderData = action.payload
        }
    }
})

export const { setPrice, setQuantity, setOrderData } = PriceAndQuantitySlice.actions;
export default PriceAndQuantitySlice.reducer;