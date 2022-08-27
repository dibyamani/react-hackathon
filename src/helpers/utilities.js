import { useState, useRef } from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import uuid from "react-uuid";

const { confirm } = Modal;

export const getStore = (key, defaultValue) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};
export const setStore = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useNewState = (defaultValue) => {
  const [state, setNewState] = useState(defaultValue);
  const setState = (newState) =>
    // does not work with array
    setNewState((prevState) => ({ ...prevState, ...newState }));
  return [state, setState];
};

export const useFocus = () => {
  const inputRef = useRef(null);
  const setFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  };
  return [inputRef, setFocus];
};

export const keyboardEvents = (onClickFunction) =>
  onClickFunction && typeof onClickFunction === "function"
    ? {
        tabIndex: 0,
        onClick: onClickFunction,
        onKeyDown: (e) => {
          if ([" ", "Enter"].includes(e.key)) {
            e.preventDefault();
            onClickFunction(e);
          }
        },
      }
    : {};

export const trimArray = (arr) => {
  return arr.filter((element) => {
    return (
      typeof element === "object" &&
      !Array.isArray(element) &&
      Object.keys(element).length !== 0
    );
  });
};

export const sortBy = (arr, field) => {
  arr.sort((a, b) => {
    let fa = a[field].toLowerCase(),
      fb = b[field].toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
};

export const showConfirm = (msg, title = "Do you want to delete?") =>
  new Promise((resolve) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title,
      content: msg,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        return resolve();
      },
      onCancel() {},
    });
  });

export const guid = () => {
  const id = uuid();
  return id.replaceAll("-", "");
};
