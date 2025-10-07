import { useEffect, useState } from "react";
import { View, StyleSheet, Alert, Share, TouchableOpacity, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { deletePhoto, getPhoto } from "@/lib/tp6-camera/camera/storage";
import type { Photo } from "@/lib/tp6-camera/camera/types";

export default function PhotoDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [photo, setPhoto] = useState<Photo | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (!id) return;
            const p = await getPhoto(id);
            setPhoto(p);
        })();
    }, [id]);

    const onDelete = () => {
        Alert.alert("Supprimer la photo", "Cette action est définitive.", [
            { text: "Annuler", style: "cancel" },
            {
                text: "Supprimer",
                style: "destructive",
                onPress: async () => {
                    await deletePhoto(String(id));
                    router.replace("/tp6-camera"); // retour Galerie
                },
            },
        ]);
    };

    const onShare = async () => {
        if (!photo) return;
        try {
            await Share.share({ url: photo.uri, message: photo.uri, title: "Partager la photo" });
        } catch { }
    };

    if (!photo) return null;

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <Image source={{ uri: photo.uri }} style={{ flex: 1 }} contentFit="contain" />

            {/* Toolbar bas: Partager / Supprimer */}
            <View style={styles.toolbar}>
                {/* <TouchableOpacity style={[styles.toolBtn, styles.primary]} onPress={() => router.replace("/tp6-camera")}>
                    <Text style={styles.pillText}>← Galerie</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={[styles.toolBtn, styles.primary]} onPress={onShare}>
                    <Text style={styles.toolText}>Partager</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toolBtn, styles.danger]} onPress={onDelete}>
                    <Text style={styles.toolText}>Supprimer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        position: "absolute",
        top: 18,
        left: 16,
        backgroundColor: "rgba(0,0,0,0.35)",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    pill: {},
    pillText: { color: "white", fontWeight: "700" },

    toolbar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: "row",
        gap: 12,
        padding: 16,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    toolBtn: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    primary: { backgroundColor: "#111827" },
    danger: { backgroundColor: "#B91C1C" },
    toolText: { color: "white", fontWeight: "600" },
});
