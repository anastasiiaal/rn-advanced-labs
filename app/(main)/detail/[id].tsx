import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id?: string | string[] }>();
    const idText = Array.isArray(id) ? id[0] : id;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Detail {idText} 🎯</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});