import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function TP3FormsLayout() {
    const router = useRouter();
    const BackButton = () => (
        <TouchableOpacity
            onPress={() => router.push("/home")}
            style={{ paddingHorizontal: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Back"
        >
            <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
    );

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Back",
                    headerShown: true,
                    headerLeft: () => <BackButton />,
                }}
            />
            <Stack.Screen
                name="formik/index"
                options={{
                    title: "Back",
                    headerShown: true,
                    headerLeft: () => <BackButton />,
                }}
            />
            <Stack.Screen
                name="rhf/index"
                options={{
                    title: "Back",
                    headerShown: true,
                    headerLeft: () => <BackButton />,
                }}
            />
        </Stack>
    );
}


