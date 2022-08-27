import { getStore, setStore, sortBy } from "helpers/utilities";
import {
  initItemTypesState,
  addItemTypesState,
  updateItemTypeState,
  removeItemTypeState,
  addItemFieldState,
  updateItemFieldState,
  removeItemFieldState,
} from "../reducers/itemsTypesSlice";

const STORE_ITEM_TYPES = "itemTypes";

export const fetchItemTypes = () => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    sortBy(data, "itemType");
    dispatch(initItemTypesState(data));
  };
};

export const addItemType = (itemType) => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    data.push(itemType);
    setStore(STORE_ITEM_TYPES, data);
    dispatch(addItemTypesState(itemType));
  };
};

export const updateItemType = (id, fieldName, fieldValue) => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    const item = data.find((x) => x.id === id);
    if (item) {
      item[fieldName] = fieldValue;
      setStore(STORE_ITEM_TYPES, data);

      dispatch(
        updateItemTypeState({ id, field: fieldName, value: fieldValue })
      );
    }
  };
};

export const removeItemType = (id) => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    const index = data.findIndex((x) => x.id === id);
    if (index !== -1) {
      data.splice(index, 1);

      setStore(STORE_ITEM_TYPES, data);

      dispatch(removeItemTypeState({ id }));
    }
  };
};

export const addItemField = (itemField) => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    const { itemId, ...rest } = itemField;
    const item = data.find((x) => x.id === itemId);
    if (item) {
      item.itemFields.push(rest);
      setStore(STORE_ITEM_TYPES, data);

      dispatch(addItemFieldState(itemField));
    }
  };
};

export const updateItemField = (id, index, field, value) => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    const item = data.find((x) => x.id === id);
    if (item) {
      item.itemFields[index][field] = value;
      setStore(STORE_ITEM_TYPES, data);

      dispatch(updateItemFieldState({ id, index, field, value }));
    }
  };
};

export const removeItemField = (id, index) => {
  return (dispatch) => {
    const data = getStore(STORE_ITEM_TYPES, []);
    const item = data.find((x) => x.id === id);
    if (item) {
      item.itemFields.splice(index, 1);
      setStore(STORE_ITEM_TYPES, data);

      dispatch(removeItemFieldState({ id, index }));
    }
  };
};
