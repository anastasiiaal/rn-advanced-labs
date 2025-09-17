import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { Robot, robotSchema } from "@/validation/tp4-robots/robotSchema";

interface RobotsState {
    robots: Robot[];
    createRobot: (data: Omit<Robot, "id">) => void;
    updateRobot: (id: string, data: Omit<Robot, "id">) => void;
    deleteRobot: (id: string) => void;
    getRobotById: (id: string) => Robot | undefined;
}

export const useRobotsStore = create<RobotsState>()(
    persist(
        (set, get) => ({
            robots: [],

            createRobot: (data) => {
                // Vérif unicité du name
                const exists = get().robots.some(r => r.name === data.name);
                if (exists) {
                    throw new Error("Un robot avec ce nom existe déjà");
                }

                // Validation avec Yup
                const newRobot: Robot = {
                    id: uuidv4(),
                    ...data,
                };
                robotSchema.validateSync(newRobot);

                set((state) => ({
                    robots: [...state.robots, newRobot],
                }));
            },

            updateRobot: (id, data) => {
                const robots = get().robots;

                // Vérif unicité du name (sauf pour le robot en cours)
                const exists = robots.some(r => r.name === data.name && r.id !== id);
                if (exists) {
                    throw new Error("Un robot avec ce nom existe déjà");
                }

                const updatedRobot: Robot = { id, ...data };
                robotSchema.validateSync(updatedRobot);

                set({
                    robots: robots.map((r) => (r.id === id ? updatedRobot : r)),
                });
            },

            deleteRobot: (id) => {
                set((state) => ({
                    robots: state.robots.filter((r) => r.id !== id),
                }));
            },

            getRobotById: (id) => {
                return get().robots.find((r) => r.id === id);
            },
        }),
        {
            name: "robots-storage",
            storage: {
                getItem: async (key) => {
                    const value = await AsyncStorage.getItem(key);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (key, value) => {
                    await AsyncStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: async (key) => {
                    await AsyncStorage.removeItem(key);
                },
            },
        }
    )
);
