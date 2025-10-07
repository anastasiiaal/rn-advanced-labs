import RobotListItem from "@/components/tp5-robots-db/RobotListItem";
import { deleteRobot, listRobots, SortBy, Robot, SortDir } from "@/services/tp5-robots-db/robotsRepo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RobotsDbIndex() {
    const router = useRouter();
    const qc = useQueryClient();

    // état local pour le tri
    const [sortBy, setSortBy] = useState<SortBy>("updated_at");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const robotsQ = useQuery({
        queryKey: ["robots", { sortBy, sortDir }],
        queryFn: () => listRobots({ sortBy, sortDir }),
    });

    const del = useMutation({
        mutationFn: (id: string) => deleteRobot(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["robots"] }),
    });

    const askDelete = (r: Robot) =>
        Alert.alert("Supprimer ?", `Supprimer "${r.name}" ?`, [
            { text: "Annuler", style: "cancel" },
            {
                text: "Supprimer",
                style: "destructive",
                onPress: () => del.mutate(r.id),
            },
        ]);

    // helpers UI
    const toggleSort = (key: SortBy) => {
        if (sortBy === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(key);
            // défauts “naturels”
            setSortDir(key === "name" ? "asc" : "desc");
        }
    };

    const labelArrow = (key: SortBy) => {
        if (sortBy !== key) return "";
        return sortDir === "asc" ? " ↑" : " ↓";
    };

    const data = useMemo(() => robotsQ.data ?? [], [robotsQ.data]);

    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            {/* Barre de tri */}
            <View style={{ marginBottom: 12 }}>
                <Text style={{ fontWeight: "700", marginBottom: 20, textAlign: "center" }}>Trier par :</Text>
                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                    <SortPill
                        active={sortBy === "name"}
                        onPress={() => toggleSort("name")}
                        label={`Nom${labelArrow("name")}`}
                    />
                    <SortPill
                        active={sortBy === "year"}
                        onPress={() => toggleSort("year")}
                        label={`Année${labelArrow("year")}`}
                    />
                    {/* Optionnel : laisser “Récents” */}
                    <SortPill
                        active={sortBy === "updated_at"}
                        onPress={() => toggleSort("updated_at")}
                        label={`Récents${labelArrow("updated_at")}`}
                    />
                </View>
            </View>

            <FlatList
                data={data}
                keyExtractor={(r) => r.id}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        {robotsQ.isLoading ? "Chargement…" : "Aucun robot."}
                    </Text>
                }
                renderItem={({ item }) => (
                    <RobotListItem
                        robot={item}
                        onEdit={() => router.push(`/tp5-robots-db/edit/${item.id}`)}
                        onDelete={() => askDelete(item)}   // ← confirmation avant delete
                    />
                )}
            />

            {/* FAB */}
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
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                }}
                onPress={() => router.push("/tp5-robots-db/create")}
            >
                <Text style={{ color: "white", fontSize: 28, marginTop: -2 }}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Component Pill to display sort buttons
function SortPill({
    label,
    onPress,
    active,
}: {
    label: string;
    onPress: () => void;
    active?: boolean;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: active ? "#007AFF" : "#ccc",
                backgroundColor: active ? "#E6F0FF" : "white",
            }}
        >
            <Text style={{ color: active ? "#007AFF" : "#333", fontWeight: "600" }}>{label}</Text>
        </TouchableOpacity>
    );
}
