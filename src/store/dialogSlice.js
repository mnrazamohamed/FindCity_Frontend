import { createSlice } from "@reduxjs/toolkit";


const generateInitStates = () => {
    return [
        "login",
        "signup",
        "OTP",
        "UpdatePassword",
        "post",
        "boardingDetails",
        "receipt",
        "confirmation",
        "boardingForm",
        "profile",
        "userDetails",
    ]
        .reduce((prev, cur) => ({ ...prev, [cur]: { status: false, data: "", onSubmit: "" } }), {})
}

const DialogSlice = createSlice({
    name: "Dialog Slice",
    initialState: generateInitStates(),
    reducers: {
        show: (state, payload) => {
            const { name, onSubmit, data } = payload?.payload
            state[name] = {
                status: true,
                data: data,
                onSubmit: onSubmit
            }
        },
        hide: (state, payload) => {
            state[payload?.payload] = {
                status: false,
                data: "",
                onSubmit: undefined
            }
        },
    }
})

export const dialogActions = DialogSlice.actions
export default DialogSlice