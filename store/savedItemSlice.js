import { createSlice } from "@reduxjs/toolkit";

const savedItemsSlice = createSlice({
  name: "saveItems",
  initialState: {
    items: [],
  },

  reducers: {
    saveItem: (state, action) => {
      const { item } = action.payload;
      if (item) {
        state.items.push(item);
      }
    },
  },
});

export const { saveItem } = savedItemsSlice.actions;
export default savedItemsSlice.reducer;
