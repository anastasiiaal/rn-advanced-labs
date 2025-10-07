import { RootState } from "@/app/(tp4-robots-rtk)/rootReducer";

export const selectAllRobots = (state: RootState) => state.robots.robots;

export const selectRobotById = (id: string) => (state: RootState) =>
    state.robots.robots.find(r => r.id === id);

export const selectRobotByName = (name: string) => (state: RootState) =>
    state.robots.robots.find(r => r.name === name);
