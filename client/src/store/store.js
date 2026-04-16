import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./counterSlice.js";
const store = configureStore({
  reducer: userReducer,
});

export default store;
