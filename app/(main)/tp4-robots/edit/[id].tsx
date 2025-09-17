import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";

import { useRobotsStore } from "@/store/tp4-robots/robotsStore";
import RobotForm from "@/components/tp4-robots/RobotForm";

export default function EditRobotScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const robot = useRobotsStore((s) => s.getRobotById(id!));

    if (!robot) {
        return (
            <SafeAreaView style={{ flex: 1, padding: 16 }}>
                <Text>Robot introuvable</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <RobotForm
                initialValues={robot}
                onSubmitSuccess={() => {
                    router.replace("/(main)/tp4-robots");
                }}
            />
        </SafeAreaView>
    );
}
