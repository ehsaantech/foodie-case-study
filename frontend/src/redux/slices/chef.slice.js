import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api.service";
import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    chefs: null,
};

export const getChefUsers = createAsyncThunk("chefs/getChefUsers", (_, thunkAPI) => {
    const response = thunkHandler(
        clients.default.client({
            method: "GET",
            url: "/user/get/chefs"
        }),
        thunkAPI
    );
    return response;
}
);

export const chefsSlice = createSlice({
    name: "chefs",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChefUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getChefUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.chefs = action.payload.data;
            })
            .addCase(getChefUsers.rejected, (state, action) => {
                state.status = "failed";
                toast.error(action.payload?.data?.message);
            })
    },
});

export default chefsSlice.reducer;