import "./App.css";

import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LayoutMaster from "./components/LayoutMaster";
import InventoryTypes from "./pages/InventoryTypes";

import { useDispatch } from "react-redux";
import { fetchItemTypes } from "stores/actions/itemTypesApi";
import InventoryEntries from "./pages/InventoryEntries";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // load all existing inventories
    dispatch(fetchItemTypes());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutMaster />}>
          <Route exact path="/">
            <Route index element={<InventoryEntries />} />
            <Route path="/inventories/:id" element={<InventoryEntries />} />
          </Route>

          <Route path="/types" element={<InventoryTypes />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
