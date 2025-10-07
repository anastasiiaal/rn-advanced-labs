import { useCallback, useState } from "react";
import { View, FlatList, TouchableOpacity, Dimensions, RefreshControl, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";
import { listPhotos } from "@/lib/tp6-camera/camera/storage";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GAP = 6;
const NUM_COLS = 3;

export default function GalleryScreen() {
    const router = useRouter();
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const data = await listPhotos();
            setPhotos(data);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            load();
        }, [load])
    );

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
                numColumns={NUM_COLS}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/tp6-camera/detail/${item.id}`)}
                        style={{ width: "30%", height: "auto", aspectRatio: 1, margin: GAP, borderRadius: 8, overflow: "hidden", backgroundColor: "#eee" }}
                    >
                        <Image source={{ uri: item.uri }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyTitle}>Aucune photo</Text>
                        <Text style={styles.emptyHint}>Appuie sur “+” pour en prendre une.</Text>
                    </View>
                }
                refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
                contentContainerStyle={{ paddingBottom: 96 }}
            />
            </SafeAreaView>

            {/* Bouton flottant pour ouvrir la caméra */}
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
                onPress={() => router.push("/tp6-camera/camera")}
            >
                <Text style={{ color: "white", fontSize: 28, marginTop: -2 }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 80 },
    emptyTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
    emptyHint: { color: "#666" },
});
