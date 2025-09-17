import { Formik } from "formik";
import React from "react";
import { Button, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { contactSchema } from "../validation/schema";

export default function ContactForm() {
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                confirmPassword: "",
                displayName: "",
                termsAccepted: false,
            }}
            validationSchema={contactSchema}
            onSubmit={(values) => {
                console.log("Form Submitted:", values);
            }}
        >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View style={styles.container}>
                    {/* Display Name */}
                    <TextInput
                        placeholder="Nom affiché"
                        style={styles.input}
                        onChangeText={handleChange("displayName")}
                        value={values.displayName}
                    />
                    {touched.displayName && errors.displayName && (
                        <Text style={styles.error}>{errors.displayName}</Text>
                    )}

                    {/* Email */}
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                    )}

                    {/* Password */}
                    <TextInput
                        placeholder="Mot de passe"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={handleChange("password")}
                        value={values.password}
                    />
                    {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                    )}

                    {/* Confirm Password */}
                    <TextInput
                        placeholder="Confirmer le mot de passe"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={handleChange("confirmPassword")}
                        value={values.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.error}>{errors.confirmPassword}</Text>
                    )}

                    {/* Terms */}
                    <View style={styles.switchRow}>
                        <Switch
                            value={values.termsAccepted}
                            onValueChange={(val) => setFieldValue("termsAccepted", val)}
                        />
                        <Text>Accepter les conditions</Text>
                    </View>
                    {touched.termsAccepted && errors.termsAccepted && (
                        <Text style={styles.error}>{errors.termsAccepted}</Text>
                    )}

                    <Button title="Envoyer" onPress={handleSubmit as any} />
                </View>
            )}
        </Formik>
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
