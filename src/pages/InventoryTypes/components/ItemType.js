import { Card, Form, Input, Space, Button, Select, Alert } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { keyboardEvents, guid } from "helpers/utilities";
import { fieldTypeList } from "pages/constants";
import { useDispatch } from "react-redux";
import {
  addItemField,
  updateItemType,
  removeItemType,
  updateItemField,
  removeItemField,
} from "stores/actions/itemTypesApi";

import { fieldTypes } from "pages/constants";
import { showConfirm } from "helpers/utilities";

const { Option } = Select;

const ItemType = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { itemFields } = data;

  const onItemTypeChange = (fldName, fldValue) => {
    dispatch(updateItemType(data.id, fldName, fldValue));
  };

  const onFieldChange = (fldName, fldValue, index) => {
    dispatch(updateItemField(data.id, index, fldName, fldValue));
  };

  const onAddField = (add) => {
    const fieldItem = {
      itemId: data.id,
      id: guid(),
      fieldName: "",
      fieldType: fieldTypes.TEXT,
    };
    dispatch(addItemField(fieldItem));
    add();

    const { itemFields, ...rest } = data;

    form.setFieldsValue({ ...rest, itemFields: [...itemFields, fieldItem] });
  };

  const onRemoveField = (remove, index) => {
    showConfirm("Do you want to delete?", "Delete").then(() => {
      dispatch(removeItemField(data.id, index));
      remove(index);
    });
  };

  const onRemoveItemType = () => {
    showConfirm("Do you want to delete?", "Delete").then(() => {
      dispatch(removeItemType(data.id));
    });
  };

  return (
    <Card
      size="small"
      title={data.itemType}
      extra={
        <a {...keyboardEvents(onRemoveItemType)}>
          <DeleteOutlined />
        </a>
      }
    >
      <Form layout="vertical" form={form} initialValues={{ ...data }}>
        <Form.Item label="Item type" name="itemType">
          <Input
            onChange={(e) => onItemTypeChange("itemType", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Item title" name="itemTitle">
          <Select onChange={(v) => onItemTypeChange("itemTitle", v)}>
            {itemFields.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.fieldName} &nbsp;
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div style={{ padding: "10px 0 10px 0" }}>
          <Alert type="warning" message="Please don't add duplicate fields." />
          Fields
        </div>
        <Form.List name="itemFields">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, idx) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.itemFields !== curValues.itemFields
                    }
                  >
                    {() => (
                      <Form.Item {...field} name={[field.name, "fieldName"]}>
                        <Input
                          onChange={(e) =>
                            onFieldChange(
                              `fieldName`,
                              e.target.value,
                              field.name
                            )
                          }
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item {...field} name={[field.name, "fieldType"]}>
                    <Select
                      style={{
                        width: 110,
                      }}
                      onChange={(v) =>
                        onFieldChange(`fieldType`, v, field.name)
                      }
                    >
                      {fieldTypeList.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {idx > 0 && (
                    <MinusCircleOutlined
                      onClick={() => onRemoveField(remove, field.name)}
                    />
                  )}
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  //onClick={() => add()}
                  onClick={() => onAddField(add)}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};

export default ItemType;
