import { createSlice } from "@reduxjs/toolkit"
import { LoginUserType } from "../AllTypes"



const initialState: LoginUserType = {
    user: {
        id: "",
        name: "",
        description: "",
        phone: 0,
        email: "",
        password: "",
        image_url: "",
        created_at: "",
        updated_at: "",
        location: "",
        role: "",
        cp_code: "",

    },
    token: localStorage.getItem("token") || "",
    userType: "",
    canteen: [{
        id: "",
        name: "",
        location: "",
        description: "",
        contact: 0,
        image_url: "",
        created_at: "",
        updated_at: "",
        email: "",
        password: ""
    }]
}


const LoginCanteenUserSlice = createSlice({
    name: 'LoginCanteenUser',
    initialState,
    reducers: {
        setLoginCanteenUser: (state, action) => {
            state.user = action.payload
        },
        setLoginCanteenUserToken: (state, action) => {
            state.token = action.payload
        },
        setLoginCanteenData: (state, action) => {
            state.canteen = action.payload
        }
    }
})
export const { setLoginCanteenUser, setLoginCanteenUserToken, setLoginCanteenData } = LoginCanteenUserSlice.actions
export default LoginCanteenUserSlice.reducer

