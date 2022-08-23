import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    msg: "",
    variant: "success"
}

const MessageSlice = createSlice({
    name: "Message Slice",
    initialState,
    reducers: {
        show: (state, payload) => {
            const {msg, variant = "success"} = payload?.payload
            state.status = true
            state.msg = msg
            state.variant = variant

        },
        hide: (state, payload) => {
            state.status = false
            state.msg = ""
            state.variant = "success"
        },
    }
})

export const messageActions = MessageSlice.actions
export default MessageSlice