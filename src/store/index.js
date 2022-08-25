import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dialogSlice from "./dialogSlice";
import drawerSlice from "./drawerSlice";
import MessageSlice from "./messageSlice";
import mapSlice from "./mapSlice";
import forceUpdateSlice from "./forceUpdateSlice";

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)


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
        auth: persistedReducer,
        message: MessageSlice.reducer,
        leftDrawer: drawerSlice.reducer,
        map: mapSlice.reducer,
        forceUpdate: forceUpdateSlice.reducer
    }
})

export const persistor = persistStore(store)
