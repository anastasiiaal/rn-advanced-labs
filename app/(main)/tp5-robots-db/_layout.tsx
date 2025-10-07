// app/(main)/TP5-robots-db/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function Layout() {
    return (
        <QueryClientProvider client={client}>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Robots (SQLite)" }} />
                <Stack.Screen name="create" options={{ title: "Create robot" }} />
                <Stack.Screen name="edit/[id]" options={{ title: "Edit robot" }} />
            </Stack>
        </QueryClientProvider>
    );
}
