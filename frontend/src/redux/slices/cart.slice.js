import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import clients, { thunkHandler } from "../../services/api.service";
import { toast } from "react-toastify";

const initialState = {
	status: "idle",
	cartItem: null,
	totalAmount: null,
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			let payload = action.payload.item;
			if (!state.cartItem) {
				state.cartItem = [payload]
			} else {
				let contain = state.cartItem.find((item) => item.id === payload.id);
				if (contain) {
					state.cartItem = state.cartItem.map((e) => {
						let obj = e;
						if (obj.id === payload.id) {
							obj.quantity = obj.quantity + 1;
						}
						return obj;
					});
				} else {
					state.cartItem = [...state.cartItem, payload]
				}
			}
			toast.success(`${payload.name} added to cart successfully.`)
		},
		updateInCart: (state, action) => {
			state.cartItem = state.cartItem.map((e) => {
				let obj = e;
				if (obj.id === action.payload.id) {
					obj = action.payload.obj;
				}
				return obj;
			});
		},
		deleteFromCart: (state, action) => {
			const filter = state.cartItem.filter((e) => e.id !== action.payload.id);
			if (filter.length === 0) {
				state.cartItem = null;
			} else {
				state.cartItem = filter;
			}
		},
		calculateTotal: (state, action) => {
			let total = 0;
			if (state.cartItem && state.cartItem?.length) {
				state.cartItem.forEach((e) => {
					total += (e.price * e.quantity)
				})
			}
			state.totalAmount = total;
		},
		clearCart: (state, action) => {
			state.cartItem = null;
			state.totalAmount = null;
		}
	}
});


export const { addToCart, updateInCart, deleteFromCart, calculateTotal, clearCart } = cartSlice.actions;
export default cartSlice.reducer;