import { View } from "react-native";
import { Text } from "@react-navigation/elements";
import ContactForm from "./components/ContactForm";

export default function FormikFormScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
                Contact us
            </Text>
            <ContactForm />
        </View>
    );
}
