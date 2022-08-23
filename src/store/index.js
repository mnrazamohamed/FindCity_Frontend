import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dialogSlice from "./dialogSlice";
import drawerSlice from "./drawerSlice";
import MessageSlice from "./messageSlice";
import mapSlice from "./mapSlice";
import forceUpdateSlice from "./forceUpdateSlice";

export const store = configureStore({

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['Dialog Slice/show'],
                ignoredPaths: [`dialog.confirmation.onSubmit`]
            },
        }),

    reducer: {
        dialog: dialogSlice.reducer,
        auth: authSlice.reducer,
        message: MessageSlice.reducer,
        leftDrawer: drawerSlice.reducer,
        map: mapSlice.reducer,
        forceUpdate: forceUpdateSlice.reducer
    }
})

