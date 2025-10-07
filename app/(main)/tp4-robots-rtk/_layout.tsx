import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Slot } from "expo-router";
import { store, persistor } from "@/app/(tp4-robots-rtk)/store";

export default function Layout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Slot />
            </PersistGate>
        </Provider>
    );
}
