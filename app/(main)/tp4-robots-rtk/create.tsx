import RobotForm from "@/components/tp4-robots-rtf/RobotForm";
import { useRouter } from "expo-router";

export default function CreateRobotScreen() {
    const router = useRouter();
    return (
        <RobotForm onSubmitSuccess={() => router.replace("/tp4-robots-rtk")} />
    );
}
