import { createSlice } from "@reduxjs/toolkit"
// import { UserDataType } from "../POSPages/RenderUserLogin"

interface UserDataType {
    user: {
        id?: string;
        name?: string;
        phone?: number;
        email?: string;
        role?: string;
        cp_code?: string;
    }
}
export const initialState: UserDataType = {
    user: {
        id: "",
        name: "",
        phone: 0,
        email: "",
        role: "",
        cp_code: "",
    },
}


const UserSaveSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setUser } = UserSaveSlice.actions
export default UserSaveSlice.reducer