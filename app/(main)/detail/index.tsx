import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetailIndexScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detail without parameter</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});


