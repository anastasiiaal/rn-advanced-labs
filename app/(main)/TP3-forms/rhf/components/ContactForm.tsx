import React from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Switch,
    StyleSheet,
    Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "../validation/schema";
import * as Haptics from "expo-haptics";

export default function ContactForm() {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            displayName: "",
            termsAccepted: false,
        },
    });

    const onSubmit = (data: ContactFormData) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); // succès
        Alert.alert("Succès", "Votre message a été envoyé ✅");
        reset();
    };


    return (
        <View style={styles.container}>
            {/* Display Name */}
            <Controller
                control={control}
                name="displayName"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Nom affiché"
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.displayName && (
                <Text style={styles.error}>{errors.displayName.message}</Text>
            )}

            {/* Email */}
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}
                        keyboardType="email-address"
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            {/* Password */}
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Mot de passe"
                        style={styles.input}
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
            )}

            {/* Confirm Password */}
            <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Confirmer le mot de passe"
                        style={styles.input}
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword.message}</Text>
            )}

            {/* Terms */}
            <View style={styles.switchRow}>
                <Controller
                    control={control}
                    name="termsAccepted"
                    render={({ field: { onChange, value } }) => (
                        <Switch value={value} onValueChange={onChange} />
                    )}
                />
                <Text>Accepter les conditions</Text>
            </View>
            {errors.termsAccepted && (
                <Text style={styles.error}>{errors.termsAccepted.message}</Text>
            )}

            {/* Submit */}
            <Button
                title="Envoyer"
                onPress={handleSubmit(
                    onSubmit,
                    () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error) // erreurs
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
    },
    error: {
        color: "red",
        fontSize: 12,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});
