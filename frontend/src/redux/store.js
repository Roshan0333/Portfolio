import { configureStore } from "@reduxjs/toolkit";
import {profileSlice} from "./slice.js";

export const store = configureStore({
    reducer: {
        profile: profileSlice
    }
})