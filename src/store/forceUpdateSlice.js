import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    post: undefined,
    request: undefined,
    user: undefined,
    boarding: undefined,
    users: undefined,
}

const forceUpdateSlice = createSlice({
    name: "ForceUpdate Slice",
    initialState,
    reducers: {
        update: (state, { payload }) => {
            state[payload] = Math.random()
        },
    }
})

export const forceUpdateAction = forceUpdateSlice.actions
export default forceUpdateSlice