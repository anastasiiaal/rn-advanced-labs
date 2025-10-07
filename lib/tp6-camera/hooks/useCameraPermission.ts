import { useEffect } from "react";
import { useCameraPermissions } from "expo-camera";

type Options = { autoRequest?: boolean };

export function useCameraPermission(options: Options = { autoRequest: false }) {
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (options.autoRequest && permission?.status !== "granted") {
            requestPermission();
        }
    }, [options.autoRequest, permission?.status, requestPermission]);

    return {
        status: permission?.status,          // "granted" | "denied" | "undetermined"
        granted: permission?.granted ?? false,
        canAskAgain: permission?.canAskAgain ?? true,
        request: requestPermission,
    };
}
