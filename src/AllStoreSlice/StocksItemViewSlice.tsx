import { createSlice } from "@reduxjs/toolkit"

export interface StocksItemViewStateType {
    stockId: string,
}


const initialState: StocksItemViewStateType = {
    stockId: "",
}


const StocksItemViewSlice = createSlice({
    name: "StocksItemView",
    initialState,
    reducers: {
        setStocksItemView: (state, action) => {
            state.stockId = action.payload
        }
    },

})

export const { setStocksItemView } = StocksItemViewSlice.actions
export default StocksItemViewSlice.reducer