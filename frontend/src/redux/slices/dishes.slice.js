import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api.service";
import { toast } from "react-toastify";

const initialState = {
  status: "idle",
  dishes: null,
  chefDishes: null,
  dish: null,
};

export const getAllDishes = createAsyncThunk("dishes/getAllDishes", (_, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: "/dish"
    }),
    thunkAPI
  );
  return response;
});
export const getChefDishes = createAsyncThunk("dishes/getChefDishes", ({ id }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "GET",
      url: `/dish/chef/${id}`
    }),
    thunkAPI
  );
  return response;
});
export const addDishes = createAsyncThunk("dishes/addDishes", ({ data }, thunkAPI) => {
  const response = thunkHandler(
    clients.default.client({
      method: "POST",
      url: "/dish",
      data,
    }),
    thunkAPI
  );
  return response;
});

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDishes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDishes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dishes = action.payload.data;
      })
      .addCase(getAllDishes.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
      .addCase(getChefDishes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChefDishes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chefDishes = action.payload.data;
      })
      .addCase(getChefDishes.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
      .addCase(addDishes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDishes.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Dish added Successfully")
      })
      .addCase(addDishes.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload?.data?.message);
      })
  },
});

export default dishesSlice.reducer;