import { createSlice } from "@reduxjs/toolkit";
import { GetOrderTypes, QuantityType } from "../AllTypes";

interface ItemViewType {
    id: string,
    data: QuantityType[],
    order: GetOrderTypes | null
}

const initialState: ItemViewType = {
    id: "",
    data: [],
    order: null
}


const UserOrderListSlice = createSlice({
    name: 'OrderViewList',
    initialState,
    reducers: {
        setUserItemViewId: (state, action) => {
            console.log(action.payload)
            state.id = action.payload;
        },
        setUserItemViewData: (state, action) => {
            state.data = action.payload
        },
        setuserOrderDetails: (state, action) => {
            console.log(action.payload)
            state.order = action.payload
        }
    },
});


export const { setUserItemViewId, setUserItemViewData, setuserOrderDetails } = UserOrderListSlice.actions
export default UserOrderListSlice.reducer