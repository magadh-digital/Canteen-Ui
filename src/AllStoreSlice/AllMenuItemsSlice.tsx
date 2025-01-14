import { createSlice } from "@reduxjs/toolkit"
import { MenuItemType } from "../AllTypes";
interface AllMenuItemsType {
    menuItemId: string;
    menuItemsData: MenuItemType
}

const initialState: AllMenuItemsType = {
    menuItemsData: {} as MenuItemType,
    menuItemId: "",
}

export const AllMenuItemsSlice = createSlice({
    name: 'allMenuItems',
    initialState,
    reducers: {
        setAllMenuItems: (state, action) => {
            state.menuItemsData = action.payload
        },
        setMenuItemId: (state, action) => {
            state.menuItemId = action.payload
        }
    },
})

export const { setAllMenuItems, setMenuItemId } = AllMenuItemsSlice.actions
export default AllMenuItemsSlice.reducer
