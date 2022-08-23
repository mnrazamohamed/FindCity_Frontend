import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false
}

const drawerSlice = createSlice({
    name: "Drawer Slice",
    initialState,
    reducers: {
        show: state => { state.status = true },
        hide: state => { state.status = false },
    }
})

export const drawerActions = drawerSlice.actions
export default drawerSlice