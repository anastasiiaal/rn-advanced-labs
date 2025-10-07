import React, { useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Modal,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useAppDispatch, useAppSelector } from "@/app/(tp4-robots-rtk)/hooks";
import { selectAllRobots } from "@/features/robots/tp4-robots-rtk/selectors";
import { deleteRobot } from "@/features/robots/tp4-robots-rtk/robotsSlice";

const typeLabels: Record<string, string> = {
    industrial: "Industriel",
    service: "Service",
    medical: "Médical",
    educational: "Éducatif",
    other: "Autre",
};

export default function RobotsIndexScreenRtk() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const robots = useAppSelector(selectAllRobots);

    const [showModal, setShowModal] = useState(false);

    const confirmDelete = (id: string, name: string) => {
        Alert.alert(
            "Supprimer ce robot ?",
            `Êtes-vous sûr de vouloir supprimer "${name}" ?`,
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => handleDelete(id),
                },
            ],
            { cancelable: true }
        );
    };

    const handleDelete = (id: string) => {
        dispatch(deleteRobot(id));
        setShowModal(true);
        setTimeout(() => setShowModal(false), 1500);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginTop: 15,
                    textAlign: "center",
                }}
            >
                Robots in Redux
            </Text>

            <FlatList
                data={robots}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={<Text>Aucun robot pour le moment.</Text>}
                renderItem={({ item }) => (
                    <View style={styles.robotCard}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.robotName}>{item.name}</Text>
                            <Text style={styles.robotLabel}>{item.label}</Text>
                            <Text style={styles.robotYearType}>
                                {item.year} • {typeLabels[item.type]}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() =>
                                router.push({
                                    pathname: "/(main)/tp4-robots-rtk/edit/[id]",
                                    params: { id: item.id },
                                })
                            }
                        >
                            <Ionicons name="create-outline" size={20} color="#007AFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => confirmDelete(item.id, item.name)}
                        >
                            <Ionicons name="trash-outline" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Bouton flottant + (vers create RTK) */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/(main)/tp4-robots-rtk/create")}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Modal de succès */}
            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" size={40} color="green" />
                        <Text style={{ marginTop: 8 }}>Robot supprimé avec succès</Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    robotCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    robotName: { fontSize: 18, fontWeight: "bold" },
    robotLabel: { fontSize: 14, color: "#555" },
    robotYearType: { fontSize: 12, color: "#888", marginTop: 4 },
    iconButton: { padding: 8, marginLeft: 8 },
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
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    fabText: { fontSize: 28, color: "white", marginTop: -2 },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
    },
});
