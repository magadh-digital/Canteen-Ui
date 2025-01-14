import { createSlice } from "@reduxjs/toolkit";

interface PrintStateType {
    printData: any
}

const initialState: PrintStateType = {
    printData: null
}

const PrintSlice = createSlice({
    name: 'PrintData',
    initialState,
    reducers: {
        setPrint: (state, action) => {
            state.printData = action.payload
        }
    }
})

export const { setPrint } = PrintSlice.actions;
export default PrintSlice.reducer;