import RobotForm from "@/components/tp4-robots-rtf/RobotForm";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function CreateRobotScreen() {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 2,
                    marginTop: 10,
                    textAlign: "center",
                }}
            >
                Create a 🤖 for Redux
            </Text>
            <RobotForm onSubmitSuccess={() => router.replace("/tp4-robots-rtk")} />
        </SafeAreaView>
    );
}
