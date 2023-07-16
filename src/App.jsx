import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header/Header";
import BakeryItemList from "./components/BakeryItemList/BakeryItemList";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { BAKERY_ITEM_DATA } from "./constants";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="*" element={<BakeryItemList items={BAKERY_ITEM_DATA}/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
