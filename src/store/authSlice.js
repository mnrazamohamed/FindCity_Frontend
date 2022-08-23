import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    role: undefined,
    userID: undefined,
    token: undefined,
    email: undefined
}

const authSlice = createSlice({
    name: "Auth Slice",
    initialState,
    reducers: {
        set: (state, { payload }) => {
            state.status = payload?.status ?? true
            state.role = payload?.role
            state.userID = payload?.userID
            state.token = payload?.token
            state.email = payload?.email
        },
        reset: (state) => {
            state.status = false
            state.role = undefined
            state.userID = undefined
            state.token = undefined
            state.email = undefined
        }
    }
})

export const authActions = authSlice.actions
export default authSlice

