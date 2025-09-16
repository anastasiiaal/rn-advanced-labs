import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, usePathname, useRootNavigationState, useRouter } from "expo-router";
import React from "react";

const DEFAULT_PATH_KEY = "NAVIGATION_LAST_PATH_V1";

// Save current path to restore on restart
export function useRoutePersistence(storageKey: string = DEFAULT_PATH_KEY) {
  const router = useRouter();
  const pathname = usePathname();
  const rootState = useRootNavigationState();
  const [restored, setRestored] = React.useState(false);

  // On launch -> restore
  React.useEffect(() => {
    if (!rootState?.key || restored) return;
    (async () => {
      try {
        const saved  = await AsyncStorage.getItem(storageKey);
        if (saved && saved !== pathname) {
          router.replace(saved as Href);
        }
      } catch {
      } finally {
        setRestored(true);
      }
    })();
  }, [rootState?.key, restored, router, pathname, storageKey]);

  // Store pathname every time it changes
  React.useEffect(() => {
    if (!pathname) return;
    AsyncStorage.setItem(storageKey, pathname).catch(() => {});
  }, [pathname, storageKey]);
}