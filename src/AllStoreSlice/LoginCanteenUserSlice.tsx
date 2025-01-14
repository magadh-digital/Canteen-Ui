import { createSlice } from "@reduxjs/toolkit"
import {  LoginUserType } from "../AllTypes"



const initialState: LoginUserType = {
    canteen: {
        id: "",
        name: "",
        description: "",
        contact: 0,
        email: "",
        password: "",
        image_url: "",
        created_at: "",
        updated_at: "",
        location: ""
    },
    token: ""
}


const LoginCanteenUserSlice = createSlice({
    name: 'LoginCanteenUser',
    initialState,
    reducers: {
        setLoginCanteenUser: (state, action) => {
            state.canteen = action.payload
        },
        setLoginCanteenUserToken: (state, action) => {
            state.token = action.payload
        }
    }
})
export const { setLoginCanteenUser, setLoginCanteenUserToken } = LoginCanteenUserSlice.actions
export default LoginCanteenUserSlice.reducer