import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const itemTypesSlice = createSlice({
  name: "itemTypes",
  initialState,
  reducers: {
    initItemTypesState: (state, action) => {
      state.items = [];
      action.payload.forEach((inv) => {
        state.items.push(inv);
      });
    },
    addItemTypesState: (state, action) => {
      state.items.push(action.payload);
    },
    updateItemTypeState: (state, action) => {
      const { id, field, value } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (item) {
        item[field] = value;
      }
    },
    removeItemTypeState: (state, action) => {
      const { id } = action.payload;
      const index = state.items.findIndex((x) => x.id === id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    addItemFieldState: (state, action) => {
      const { itemId, ...rest } = action.payload;
      const item = state.items.find((x) => x.id === itemId);
      if (item) {
        item.itemFields.push(rest);
      }
    },
    updateItemFieldState: (state, action) => {
      const { id, index, field, value } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (item) {
        item.itemFields[index][field] = value;
      }
    },
    removeItemFieldState: (state, action) => {
      const { id, index } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (item) {
        item.itemFields.splice(index, 1);
      }
    },
  },
});

export const {
  initItemTypesState,
  addItemTypesState,
  updateItemTypeState,
  removeItemTypeState,
  addItemFieldState,
  updateItemFieldState,
  removeItemFieldState,
} = itemTypesSlice.actions;

export const itemTypesSelector = (state) => state.itemTypes.items;

export default itemTypesSlice.reducer;
