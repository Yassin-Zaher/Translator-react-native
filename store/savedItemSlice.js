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
    clearSavedItems: (state) => {
      state.items = [];
    },
  },
});

export const { saveItem, clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;
