import { View, Text } from "react-native";
import ContactForm from "./components/ContactForm";

export default function RhfFormScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
                Contact us (RHF)
            </Text>
            <ContactForm />
        </View>
    );
}
