import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    zoomImage: ""
}

export const ZoomImageSlice = createSlice({
    name: 'ZoomImage',
    initialState,
    reducers: {
        setZoomImage: (state, action) => {
            state.zoomImage = action.payload
        }
    }
})

export const { setZoomImage } = ZoomImageSlice.actions
export default ZoomImageSlice.reducer