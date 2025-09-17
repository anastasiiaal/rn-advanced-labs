import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Text } from "@react-navigation/elements";
import ContactForm from "./components/ContactForm";

export default function FormikFormScreen() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} >
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
                    Contact us
                </Text>
                <ContactForm />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
