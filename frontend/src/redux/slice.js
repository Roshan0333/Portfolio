import {createSlice} from "@reduxjs/toolkit";
import { fetchProfile } from "./thunk.js";

const initialState = {
    data: null,
    loading: false,
    error: null
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProfile.pending, (state) => {
            state.loading =  true;
            state.error = null;
        })
        .addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})