// app/(main)/tp5-robots-db/index.tsx
import RobotListItem from "@/components/tp5-robots-db/RobotListItem";
import { deleteRobot, listRobots, Robot } from "@/services/tp5-robots-db/robotsRepo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RobotsDbIndex() {
    const router = useRouter();
    const qc = useQueryClient();

    const robotsQ = useQuery({ queryKey: ["robots"], queryFn: () => listRobots() });

    const del = useMutation({
        mutationFn: (id: string) => deleteRobot(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["robots"] }),
    });

    const askDelete = (r: Robot) =>
        Alert.alert("Supprimer ?", `Supprimer "${r.name}" ?`, [
            { text: "Annuler", style: "cancel" },
            { text: "Supprimer", style: "destructive", onPress: () => del.mutate(r.id) },
        ]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={robotsQ.data ?? []}
                keyExtractor={(r) => r.id}
                ListEmptyComponent={<Text style={{ textAlign: "center" }}>Aucun robot.</Text>}
                renderItem={({ item }) => (
                    <RobotListItem
                        robot={item}
                        onEdit={() => router.push(`/tp5-robots-db/edit/${item.id}`)}
                        onDelete={() => askDelete(item)}
                    />
                )}
            />

            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 24,
                    bottom: 24,
                    backgroundColor: "#007AFF",
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={() => router.push("/tp5-robots-db/create")}
            >
                <Text style={{ color: "white", fontSize: 28, marginTop: -2 }}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
