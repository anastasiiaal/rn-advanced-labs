// app/(main)/TP5-robots-db/create.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RobotForm from "@/components/tp5-robots-db/RobotForm";
import { useRouter } from "expo-router";

export default function CreateRobotDb() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <RobotForm onSuccess={() => router.replace("/tp5-robots-db")} />
        </SafeAreaView>
    );
}
