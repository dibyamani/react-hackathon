import { configureStore } from "@reduxjs/toolkit";
import inventorySlice from "./reducers/inventorySlice.js";
import itemTypesSlice from "./reducers/itemsTypesSlice.js";

export const store = configureStore({
  reducer: {
    itemTypes: itemTypesSlice,
    inventory: inventorySlice,
  },
});
