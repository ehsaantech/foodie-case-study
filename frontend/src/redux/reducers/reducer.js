import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/auth.slice";
import dishReducer from "../slices/dishes.slice";

const combinedRedurcers = combineReducers({
  auth: authReducer,
  dish: dishReducer
});


const rootReducer = (state, action) => {
  if (action.type === 'session/end') {
    state = undefined;
  }

  return combinedRedurcers(state, action);
};

export default rootReducer;