import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, List, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { guid } from "helpers/utilities";
import { itemTypesSelector } from "stores/reducers/itemsTypesSlice";
import { inventoriesSelector } from "stores/reducers/inventorySlice";
import { fetchInventories, addInventory } from "stores/actions/inventoryApi";
import ItemEntry from "./components/ItemEntry";

const InventoryEntries = () => {
  const itemTypes = useSelector(itemTypesSelector) || [];
  const inventories = useSelector(inventoriesSelector) || [];
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    // load all existing inventories
    dispatch(fetchInventories(id));
  }, [dispatch, id]);

  const onAddItemType = (itemId) => {
    const itemType = itemTypes.find((x) => x.id === itemId);
    if (!itemType) return;

    const item = {
      id: guid(),
      itemId: itemType.id,
      itemTitle: itemType.itemType,
      itemSubTitle: "No title",
      itemTitleField: itemType.itemTitle,
      itemFields: itemType.itemFields.map((x) => {
        return {
          id: x.id,
          fieldName: x.fieldName,
          fieldType: x.fieldType,
          value: "",
        };
      }),
    };
    dispatch(addInventory(item));
  };

  const onMenuClick = (e) => {
    const { key } = e; // itemtypeid
    onAddItemType(key);
  };

  const menu = () => {
    const items = itemTypes.map((itemType) => {
      return {
        key: itemType.id,
        label: itemType.itemType,
      };
    });
    return <Menu onClick={onMenuClick} items={items} />;
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
        dataSource={inventories}
        renderItem={(item) => (
          <List.Item>
            <ItemEntry data={item} />
          </List.Item>
        )}
      />
      {!id && (
        <Dropdown.Button overlay={menu} icon={<DownOutlined />}>
          Add item
        </Dropdown.Button>
      )}
      {id && <Button onClick={() => onAddItemType(id)}>Add item</Button>}
    </div>
  );
};
export default InventoryEntries;
