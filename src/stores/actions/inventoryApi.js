import { getStore, setStore, sortBy } from "helpers/utilities";
import {
  initInventoriesState,
  addInventoryState,
  updateInventoryTitleState,
  updateInventoryFieldState,
  removeInventoryFieldState,
} from "../reducers/inventorySlice";

const STORE_INVENTORY = "inventories";

export const fetchInventories = () => {
  return (dispatch) => {
    const data = getStore(STORE_INVENTORY, []);
    sortBy(data, "itemTitle");

    dispatch(initInventoriesState(data));
  };
};

export const addInventory = (inventory) => {
  return (dispatch) => {
    const data = getStore(STORE_INVENTORY, []);
    data.push(inventory);
    setStore(STORE_INVENTORY, data);
    dispatch(addInventoryState(inventory));
  };
};

export const updateInventoryTitle = (inventory) => {
  return (dispatch) => {
    const data = getStore(STORE_INVENTORY, []);
    const { id, title, subTitle } = inventory;
    const item = data.find((x) => x.id === id);
    if (item) {
      item.itemTitle = title;
      item.itemSubTitle = subTitle;
      setStore(STORE_INVENTORY, data);

      dispatch(updateInventoryTitleState(inventory));
    }
  };
};

export const updateInventoryField = (inventory) => {
  return (dispatch) => {
    const data = getStore(STORE_INVENTORY, []);
    const { itemId, id, value } = inventory;
    const item = data.find((x) => x.id === itemId);
    if (item) {
      const field = item.itemFields.find((x) => x.id === id);
      if (field) {
        field.value = value;
        setStore(STORE_INVENTORY, data);
        dispatch(updateInventoryFieldState(inventory));
      }
    }
  };
};

export const removeInventoryField = (id) => {
  return (dispatch) => {
    const data = getStore(STORE_INVENTORY, []);
    const index = data.findIndex((x) => x.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      setStore(STORE_INVENTORY, data);
      dispatch(removeInventoryFieldState({ id }));
    }
  };
};
