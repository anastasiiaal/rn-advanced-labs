import { combineReducers } from "@reduxjs/toolkit";
import robots from "@/features/robots/tp4-robots-rtk/robotsSlice";

export const rootReducer = combineReducers({
  robots, // => state.robots.robots
});

export type RootState = ReturnType<typeof rootReducer>;
