import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useSelector } from "react-redux";
import { itemTypesSelector } from "stores/reducers/itemsTypesSlice";

const { Content, Header } = Layout;

const LayoutMaster = () => {
  const itemTypes = useSelector(itemTypesSelector) || [];
  const navigate = useNavigate();
  const onNavigate = (item) => {
    if (item.key === "all") {
      navigate("/");
      return;
    }
    if (item.key === "manageTypes") {
      navigate("/types");
      return;
    }
    navigate(`/inventories/${item.key}`);
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          items={[
            { id: "all", itemType: "All" },
            ...itemTypes,
            { id: "manageTypes", itemType: "Manage types" },
          ].map((itemType) => {
            return {
              key: itemType.id,
              label: itemType.itemType,
            };
          })}
          onClick={onNavigate}
        />
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default LayoutMaster;
