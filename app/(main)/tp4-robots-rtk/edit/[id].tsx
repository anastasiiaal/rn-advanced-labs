import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/app/(tp4-robots-rtk)/hooks";
import { selectRobotById } from "@/features/robots/tp4-robots-rtk/selectors";
import RobotForm from "@/components/tp4-robots-rtf/RobotForm";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function EditRobotScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const robot = useAppSelector(selectRobotById(String(id)));
    const router = useRouter();

    if (!robot) return <View><Text>Robot introuvable.</Text></View>;

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
                Edit robot {robot.name}
            </Text>
            <RobotForm initialValues={robot} onSubmitSuccess={() => router.replace("/tp4-robots-rtk")} />
        </SafeAreaView>
    );
}
