import { createSlice } from "@reduxjs/toolkit";

const savedItemsSlice = createSlice({
  name: "saveItems",
  initialState: {
    items: [],
  },

  reducers: {
    saveItem: (state, action) => {
      const { items } = action.payload;
      state.items = items;
    },
  },
});

export const { saveItem } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;
