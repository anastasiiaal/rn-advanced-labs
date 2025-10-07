import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import RobotForm from "@/components/tp4-robots/RobotForm";

export default function CreateRobot() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 2,
                    marginTop: 10,
                    textAlign: "center",
                }}
            >
                Create a 🤖 for Zustand
            </Text>
            <RobotForm onSubmitSuccess={() => router.push("/(main)/tp4-robots")} />
        </SafeAreaView>
    );
}