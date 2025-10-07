import { useLocalSearchParams, useRouter } from "expo-router";
import { useAppSelector } from "@/app/(tp4-robots-rtk)/hooks";
import { selectRobotById } from "@/features/robots/tp4-robots-rtk/selectors";
import RobotForm from "@/components/tp4-robots-rtf/RobotForm";
import { View, Text } from "react-native";

export default function EditRobotScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const robot = useAppSelector(selectRobotById(String(id)));
    const router = useRouter();

    if (!robot) return <View><Text>Robot introuvable.</Text></View>;

    return (
        <RobotForm initialValues={robot} onSubmitSuccess={() => router.replace("/tp4-robots-rtk")} />
    );
}
