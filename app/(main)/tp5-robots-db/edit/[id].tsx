// app/(main)/TP5-robots-db/edit/[id].tsx
import RobotForm from "@/components/tp5-robots-db/RobotForm";
import { getRobot } from "@/services/tp5-robots-db/robotsRepo";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditRobotDb() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const robotQ = useQuery({ queryKey: ["robot", id], queryFn: () => getRobot(String(id)) });

    if (robotQ.isLoading) return <View><Text>Chargement…</Text></View>;
    if (!robotQ.data) return <View><Text>Robot introuvable.</Text></View>;

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <RobotForm initial={robotQ.data} onSuccess={() => router.replace("/tp5-robots-db")} />
        </SafeAreaView>
    );
}
