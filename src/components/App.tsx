import React from "react";
import OrderBook from "screens/OrderBook";
import AppProviders from "../context/AppProviders";

const App = (): JSX.Element => {
  return (
    <AppProviders>
      <OrderBook />
    </AppProviders>
  );
};

export default App;
