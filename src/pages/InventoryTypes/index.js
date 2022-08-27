import { useDispatch } from "react-redux";
import { Button, List } from "antd";
import { addItemType } from "stores/actions/itemTypesApi";
import { guid } from "helpers/utilities";
import { useSelector } from "react-redux";
import { itemTypesSelector } from "stores/reducers/itemsTypesSlice";
import ItemType from "./components/ItemType";
import { fieldTypes } from "../constants";

const Inventories = () => {
  const itemTypes = useSelector(itemTypesSelector) || [];
  const dispatch = useDispatch();

  const handleAddItemTtype = () => {
    const data = {
      id: guid(),
      itemType: "",
      itemTitle: "",
      itemFields: [
        {
          id: guid(),
          fieldName: "",
          fieldType: fieldTypes.TEXT,
        },
      ],
    };
    dispatch(addItemType(data));
  };

  return (
    <div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        dataSource={itemTypes}
        renderItem={(item) => (
          <List.Item>
            <ItemType data={item} />
          </List.Item>
        )}
      />

      <Button onClick={handleAddItemTtype}>Add type</Button>
    </div>
  );
};
export default Inventories;
