import { Card, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { keyboardEvents } from "helpers/utilities";

import { useDispatch } from "react-redux";
import {
  updateInventoryTitle,
  updateInventoryField,
  removeInventoryField,
} from "stores/actions/inventoryApi";
import CustomField from "components/CustomField";
import { showConfirm } from "helpers/utilities";
import { useEffect } from "react";

const ItemEntry = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { itemFields } = data;

  const onUpdateItem = (field, value) => {
    // Find title filed and update title based on that field
    if (data.itemTitleField === field) {
      const subTitle = form.getFieldValue(field);
      dispatch(
        updateInventoryTitle({
          id: data.id,
          title: data.itemTitle,
          subTitle,
        })
      );
    }
    // Update other fields
    dispatch(
      updateInventoryField({
        itemId: data.id,
        id: field,
        value,
      })
    );
  };

  const onRemoveField = () => {
    showConfirm("Do you want to delete?", "Delete").then(() => {
      dispatch(removeInventoryField(data.id));
    });
  };

  const getInitialValues = () => {
    const result = {};
    itemFields.forEach((field) => {
      result[field.id] = field.value;
    });

    return result;
  };

  useEffect(() => {
    const initialValues = getInitialValues();
    form.setFieldsValue({ ...initialValues });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, data]);

  return (
    <Card
      size="small"
      title={`${data.itemTitle} - ${data.itemSubTitle}`}
      extra={
        <a {...keyboardEvents(onRemoveField)}>
          <DeleteOutlined />
        </a>
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={{
          ...getInitialValues(),
        }}
      >
        {itemFields.map((field) => {
          return (
            <Form.Item label={field.fieldName} name={field.id} key={field.id}>
              <CustomField
                data={field}
                onChange={(v) => onUpdateItem(field.id, v)}
              />
            </Form.Item>
          );
        })}
      </Form>
    </Card>
  );
};

export default ItemEntry;
