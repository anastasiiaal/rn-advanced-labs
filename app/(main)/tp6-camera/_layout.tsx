import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function Layout() {
    return (
        <QueryClientProvider client={client}>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Galerie photo" }} />
                <Stack.Screen name="camera" options={{ title: "Prendre une photo" }} />
                <Stack.Screen name="detail/[id]" options={{ title: "Détail de l'image" }} />
            </Stack>
        </QueryClientProvider>
    );
}
