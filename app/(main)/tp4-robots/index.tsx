import React from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRobotsStore } from "@/store/tp4-robots/robotsStore";

export default function RobotsIndexScreen() {
    const robots = useRobotsStore((s) => s.robots);
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Liste des robots */}
            <FlatList
                data={robots}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={<Text>Aucun robot pour le moment.</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.robotCard}
                        onPress={() =>
                            router.push({
                                pathname: "/(main)/tp4-robots/[id]",
                                params: { id: item.id },
                            })
                        }

                    >
                        <Text style={styles.robotName}>{item.name}</Text>
                        <Text style={styles.robotLabel}>{item.label}</Text>
                        <Text style={styles.robotYearType}>
                            {item.year} • {item.type}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            {/* Bouton flottant + */}
            <TouchableOpacity style={styles.fab} onPress={() => router.push("/tp4-robots/create")}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    robotCard: {
        backgroundColor: "#f2f2f2",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    robotName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    robotLabel: {
        fontSize: 14,
        color: "#555",
    },
    robotYearType: {
        fontSize: 12,
        color: "#888",
        marginTop: 4,
    },
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: "#007AFF",
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5, // ombre Android
        shadowColor: "#000", // ombre iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: {
        fontSize: 28,
        color: "white",
        marginTop: -2,
    },
});
