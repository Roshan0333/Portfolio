import { createAsyncThunk } from "@reduxjs/toolkit";
import { getService } from "../service/axios.js";

export const fetchProfile = createAsyncThunk(
    "/portfolio/profile/get",
    async (_, { rejectWithValue }) => {
        const res = await getService("/portfolio/profile/get");

        if (res.ok) {
            return res.data;
        }
        else {
            return rejectWithValue(res.message);
        }
    }
);