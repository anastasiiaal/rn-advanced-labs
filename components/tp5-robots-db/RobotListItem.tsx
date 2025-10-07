// components/RobotListItem.tsx
import { Robot } from "@/services/tp5-robots-db/robotsRepo";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function RobotListItem({
    robot,
    onEdit,
    onDelete,
}: {
    robot: Robot;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const typeLabels: Record<string, string> = {
        industrial: "Industriel",
        service: "Service",
        medical: "Médical",
        educational: "Éducatif",
        other: "Autre",
    };
    return (
        <View style={{ flexDirection: "row", padding: 16, backgroundColor: "#f2f2f2", borderRadius: 12, marginBottom: 12 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700", fontSize: 16 }}>{robot.name}</Text>
                <Text>{robot.label}</Text>
                <Text style={{ color: "#666" }}>
                    {robot.year} • {typeLabels[robot.type]}
                </Text>
            </View>
            <TouchableOpacity onPress={onEdit} style={{ padding: 8, marginRight: 8 }}>
                <Ionicons name="create-outline" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={{ padding: 8 }}>
                <Ionicons name="trash-outline" size={20} color="red" />
            </TouchableOpacity>
        </View>
    );
}
