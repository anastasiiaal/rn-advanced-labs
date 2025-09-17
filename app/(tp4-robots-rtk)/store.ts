import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rootReducer from "./rootReducer";

const persistConfig = {
    key: "robots-rtk-storage",
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist utilise des valeurs non sérialisables
        }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
