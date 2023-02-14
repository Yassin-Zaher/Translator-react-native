import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";
import savedItemSlice from "./savedItemSlice";

export default configureStore({
  reducer: { history: historySlice, savedItems: savedItemSlice },
});
