import { createSlice } from "@reduxjs/toolkit";
import { MenuItemType } from "../AllTypes";

export interface QuantityStateType {
    data: MenuItemType[];
}

let initialState: QuantityStateType = {
    data: []
};

const QuantitySlice = createSlice({
    name: 'Quantity',
    initialState,
    reducers: {
        incrementQuantity: (state, action) => {
            const item = state.data.find((item) => item.id === action.payload);
            if (item) {
                item.quantity = (item.quantity ?? 0) + 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.data.find((item) => item.id === action.payload);
            if (item && (item.quantity ?? 0) > 0) {
                item.quantity = (item.quantity ?? 0) - 1;
            }
        },
        setData: (state, action) => {
            const itemExists = state.data.find(item => item.id === action.payload.id);
            if(itemExists){
                itemExists.quantity = (itemExists.quantity ?? 0) + 1;
            }else{
                state.data.push({ ...action.payload, quantity: 1 });
            }
        },

        resetData: (state) => {
            state.data = [];
        },
        removeItem: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        }
    },
});

export const { incrementQuantity, decrementQuantity, setData, resetData, removeItem } = QuantitySlice.actions;
export default QuantitySlice.reducer;
