import { fieldTypes } from "pages/constants";
import { Input, InputNumber, DatePicker, Checkbox } from "antd";
import { useState } from "react";
import moment from "moment";

const CustomField = ({ value, onChange, data, ...rest }) => {
  const { fieldType } = data;
  const [selectedValue, setSelectedValue] = useState("");

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };

  const onNumberChange = (val) => {
    const newNumber = parseInt(val || "0", 10);
    if (Number.isNaN(selectedValue)) {
      return;
    }
    setSelectedValue(newNumber);
    triggerChange(newNumber);
  };

  const onTextChange = (e) => {
    const val = e.target.value;
    setSelectedValue(val);
    triggerChange(val);
  };

  const onDateChange = (date, dateString) => {
    setSelectedValue(dateString);
    triggerChange(dateString);
  };

  const onCheckboxChange = (e) => {
    const checked = e.target.checked;
    setSelectedValue(checked);
    triggerChange(checked);
  };

  if (fieldType === fieldTypes.NUMBER)
    return (
      <InputNumber
        {...rest}
        value={value || selectedValue}
        onChange={onNumberChange}
      />
    );
  if (fieldType === fieldTypes.DATE)
    return (
      <DatePicker
        {...rest}
        value={
          value || selectedValue ? moment(value || selectedValue) : undefined
        }
        onChange={onDateChange}
      />
    );
  if (fieldType === fieldTypes.CHECKBOX)
    return (
      <Checkbox
        {...rest}
        checked={value || selectedValue}
        onChange={onCheckboxChange}
      />
    );

  return (
    <Input {...rest} value={value || selectedValue} onChange={onTextChange} />
  );
};
export default CustomField;
