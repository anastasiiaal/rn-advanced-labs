import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { rootReducer } from "./rootReducer";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    // whitelist: ["robots"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (gDM) => gDM({ serializableCheck: false }), // nécessaire pour redux-persist
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
