import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./counterSlice.js"; // Behtar hai iska naam userSlice.js rakhein
import gigReducer from "./gigSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer, // Ab state access karne ke liye state.user use hoga
    gig: gigReducer, // Ab state access karne ke liye state.gig use hoga
  },
});

export default store;
