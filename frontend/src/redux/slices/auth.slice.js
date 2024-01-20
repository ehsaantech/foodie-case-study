import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api.service";
import { toast } from "react-toastify";
import { clearStorage, getToken, saveTokenToStorage, saveUserToStorage } from "../../services/storage.service";

const initialState = {
  status: "idle",
  user: null,
};

export const login = createAsyncThunk("auth/login", ({ data }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "POST",
      url: "/auth/login",
      data,
    }),
    thunkAPI
  );
  return response;
});

export const me = createAsyncThunk("auth/me", (_, thunkAPI) => {
  clients.default.client.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getToken()}`;
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: "/auth/me",
    }),
    thunkAPI
  );
  return response;
});

export const addUser = createAsyncThunk(
  "auth/addUser",
  ({ data }, thunkAPI) => {
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/user",
        data,
      }),
      thunkAPI
    );
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      clearStorage();
      delete clients.default.client.defaults.headers.common["Authorization"];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload.data;
        state.status = "succeeded";
        state.user = user;
        saveTokenToStorage(user.accessToken)
        saveUserToStorage(user);
        toast.success("Logged in successfully");
        clients.default.client.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${user.accessToken}`;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
      .addCase(me.pending, (state) => {
        state.status = "loading";
      })
      .addCase(me.fulfilled, (state, action) => {
        const user = action.payload.data;
        state.status = "succeeded";
        state.user = user;
        saveUserToStorage(user);
      })
      .addCase(me.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("User Created Successfully");
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;