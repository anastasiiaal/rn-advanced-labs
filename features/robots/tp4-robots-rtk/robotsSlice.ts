import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Robot, robotSchema } from "@/validation/tp4-robots-rtk/robotSchema";

interface RobotsState {
    robots: Robot[];
}

const initialState: RobotsState = {
    robots: [],
};

export const robotsSlice = createSlice({
    name: "robots",
    initialState,
    reducers: {
        createRobot: (state, action: PayloadAction<Omit<Robot, "id">>) => {
            const exists = state.robots.some(r => r.name === action.payload.name);
            if (exists) {
                throw new Error("Un robot avec ce nom existe déjà");
            }

            const newRobot: Robot = {
                id: uuidv4(),
                ...action.payload,
            };

            // Validation via Yup
            robotSchema.validateSync(newRobot);

            state.robots.push(newRobot);
        },

        updateRobot: (state, action: PayloadAction<Robot>) => {
            const { id, name, label, year, type } = action.payload;

            const exists = state.robots.some(r => r.name === name && r.id !== id);
            if (exists) {
                throw new Error("Un robot avec ce nom existe déjà");
            }

            const updatedRobot: Robot = { id, name, label, year, type };
            robotSchema.validateSync(updatedRobot);

            const index = state.robots.findIndex(r => r.id === id);
            if (index !== -1) {
                state.robots[index] = updatedRobot;
            }
        },

        deleteRobot: (state, action: PayloadAction<string>) => {
            state.robots = state.robots.filter(r => r.id !== action.payload);
        },
    },
});

export const { createRobot, updateRobot, deleteRobot } = robotsSlice.actions;
export default robotsSlice.reducer;
