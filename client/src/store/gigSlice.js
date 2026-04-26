import { createSlice } from "@reduxjs/toolkit";

const gigSlice = createSlice({
  name: "gig",
  initialState: {
    gig: null,
  },
  reducers: {
    setGig(state, action) {
      state.gig = action.payload;
    },
    removeGig(state) {
      state.gig = null;
    },
  },
});

export const { setGig, removeGig } = gigSlice.actions;
export default gigSlice.reducer;
