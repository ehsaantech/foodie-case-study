import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	status: "idle",
	pageTitle: 'Home',
};

export const generalSlice = createSlice({
	name: "general",
	initialState,
	reducers: {
		updatePageTitle: (state, action) => {
			state.pageTitle = action.payload.title;
		}
	}
});


export const { updatePageTitle } = generalSlice.actions;
export default generalSlice.reducer;