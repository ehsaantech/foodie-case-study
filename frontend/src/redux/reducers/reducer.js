import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/auth.slice";
import dishReducer from "../slices/dishes.slice";
import cartReducer from "../slices/cart.slice";
import orderReducer from "../slices/order.slice";
import chefsReducer from "../slices/chef.slice";
import generalReducer from "../slices/general.slice";

const combinedRedurcers = combineReducers({
  auth: authReducer,
  dish: dishReducer,
  cart: cartReducer,
  order: orderReducer,
  chef: chefsReducer,
  general: generalReducer,
});


const rootReducer = (state, action) => {
  if (action.type === 'session/end') {
    state = undefined;
  }

  return combinedRedurcers(state, action);
};

export default rootReducer;