import React from "react";
import TradingViewWidget from "./components/TradingViewWidget";
import CandelWidget from "./components/CandelWidget";

const App = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* <h1>Stock Market Chart</h1> */}
      <TradingViewWidget />
      <CandelWidget />
    </div>
  );
};

export default App;