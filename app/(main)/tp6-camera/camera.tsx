import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { CameraView } from "expo-camera";
import { useCameraPermission } from "@/lib/tp6-camera/hooks/useCameraPermission";
import { savePhoto } from "@/lib/tp6-camera/camera/storage";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CameraScreen() {
    const { granted, status, request } = useCameraPermission({ autoRequest: true });
    const camRef = useRef<CameraView>(null);
    const router = useRouter();
    const [busy, setBusy] = useState(false);

    const [facing, setFacing] = useState<"back" | "front">("back");
    const toggleFacing = () => setFacing((f) => (f === "back" ? "front" : "back"));

    if (!granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>Accès caméra requis</Text>
                <TouchableOpacity onPress={request} style={styles.btn}>
                    <Text style={styles.btnText}>Autoriser</Text>
                </TouchableOpacity>
                <Text style={styles.caption}>Statut: {status ?? "unknown"}</Text>
            </View>
        );
    }

    const onSnap = async () => {
        if (!camRef.current || busy) return;
        try {
            setBusy(true);
            const result = await camRef.current.takePictureAsync({ skipProcessing: true, quality: 1 });
            const photo = await savePhoto(result.uri);
            router.replace(`/tp6-camera/detail/${photo.id}`);
        } catch (e) {
            console.warn(e);
        } finally {
            setBusy(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
            <CameraView style={{ flex: 1 }} ref={camRef} facing={facing} />

            {/* Overlay "Galerie" (gauche) */}
            <View style={styles.topLeft}>
                <TouchableOpacity style={styles.pill} onPress={() => router.replace("/tp6-camera")}>
                    <Text style={styles.pillText}>Galerie</Text>
                </TouchableOpacity>
            </View>

            {/* Overlay "Retourner" (droite) */}
            <View style={styles.topRight}>
                <TouchableOpacity style={[styles.pill, styles.row]} onPress={toggleFacing} accessibilityLabel="Basculer caméra">
                    <Ionicons name="camera-reverse-outline" size={18} color="#fff" />
                    <Text style={styles.pillText}>{facing === "back" ? "Arrière" : "Frontale"}</Text>
                </TouchableOpacity>
            </View>

            {/* Déclencheur */}
            <View style={styles.shutterBar}>
                <TouchableOpacity onPress={onSnap} style={styles.shutter}>
                    {busy ? <ActivityIndicator /> : <View style={styles.shutterInner} />}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
    title: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
    caption: { marginTop: 8, color: "#666" },
    btn: { backgroundColor: "#111827", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
    btnText: { color: "white", fontWeight: "600" },

    topLeft: {
        position: "absolute",
        top: 18,
        left: 16,
    },
    topRight: {
        position: "absolute",
        top: 18,
        right: 16,
    },
    pill: {
        backgroundColor: "rgba(0,0,0,0.35)",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 6 },
    pillText: { color: "white", fontWeight: "700" },

    shutterBar: {
        position: "absolute",
        bottom: 28,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    shutter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.08)",
    },
    shutterInner: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: "white",
    },
});
