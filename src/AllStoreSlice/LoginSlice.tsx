

import { createSlice } from "@reduxjs/toolkit"
// import { UserDataType } from "../POSPages/RenderUserLogin"


type LoginStateType = {
  user: {
    _id?: string;
    name?: string;
    phone?: number;
    email?: string;
    role?: string;
    cp_code?: string;
  }
  LoginType: string
  token: string,
  LoginModel : boolean
}

export const initialState= {
    user:  localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || "") : {},
    LoginType: localStorage.getItem('LoginType') || "",
    token: null,
    LoginModel : false
}


const LoginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
       setLoginType: (state, action) => {
           state.LoginType = action.payload
           localStorage.setItem('LoginType', action.payload)
       },
       SetUser : (state, action) => {
           state.user = action.payload
           localStorage.setItem('user', JSON.stringify(action.payload))
         
       },
       SetToken : (state, action) => {
           state.token = action.payload
       },
       SetLoginModel : (state, action) => {
        state.LoginModel = action.payload
    },
    SetLogOut : (state) => {
        state.user = null
        state.token = null 
        state.LoginModel = false
        localStorage.clear()
    },


    }
})

export const { setLoginType, SetUser, SetToken, SetLoginModel,SetLogOut } = LoginSlice.actions
export default LoginSlice.reducer