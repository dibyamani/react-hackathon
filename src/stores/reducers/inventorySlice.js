import { createSlice } from "@reduxjs/toolkit";
import { sortBy } from "helpers/utilities";

const initialState = {
  items: [],
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    initInventoriesState: (state, action) => {
      state.items = [];
      action.payload.forEach((inv) => {
        state.items.push(inv);
      });
    },
    addInventoryState: (state, action) => {
      state.items.push(action.payload);
      sortBy(state.items, "itemTitle");
    },
    updateInventoryTitleState: (state, action) => {
      const { id, title, subTitle } = action.payload;
      const item = state.items.find((x) => x.id === id);
      if (item) {
        item.itemTitle = title;
        item.itemSubTitle = subTitle;
      }
    },
    updateInventoryFieldState: (state, action) => {
      const { itemId, id, value } = action.payload;
      const item = state.items.find((x) => x.id === itemId);
      if (item) {
        const field = item.itemFields.find((x) => x.id === id);
        if (field) {
          field.value = value;
        }
      }
    },
    removeInventoryFieldState: (state, action) => {
      const { id } = action.payload;
      const index = state.items.findIndex((x) => x.id === id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    // updateTitleFieldState: (state, action) => {
    //   const { itemId, itemTitleField } = action.payload;
    //   state.items
    //     .filter((x) => x.itemId === itemId)
    //     .forEach((item) => {
    //       item.itemTitleField = itemTitleField;
    //     });
    // },
  },
});

export const {
  initInventoriesState,
  addInventoryState,
  updateInventoryTitleState,
  updateInventoryFieldState,
  removeInventoryFieldState,
  updateTitleFieldState,
} = inventorySlice.actions;

export const inventoriesSelector = (state) => state.inventory.items;

export default inventorySlice.reducer;
