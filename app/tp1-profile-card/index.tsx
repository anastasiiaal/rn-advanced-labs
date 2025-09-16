import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function ProfileCardScreen() {
    const [followers, setFollowers] = useState(100); // followers de départ
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
        setFollowers((prev) => prev + (isFollowing ? -1 : 1));
    };

    // Auto increment followers every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setFollowers((prev) => prev + 1);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{
                        uri: "https://i.pravatar.cc/300?img=5",
                    }}
                    style={styles.image}
                />
                <Text style={styles.name}>Jane Doe</Text>
                <Text style={styles.role}>Software Engineer</Text>

                <Button
                    title={isFollowing ? "Unfollow" : "Follow"}
                    onPress={toggleFollow}
                />

                <Text style={styles.followers}>{followers} Followers</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    card: {
        width: 300,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        alignItems: "center",
        elevation: 5, // ombre Android
        shadowColor: "#000", // ombre iOS
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    role: {
        fontSize: 16,
        color: "#666",
        marginBottom: 12,
    },
    followers: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: "600",
    },
});
