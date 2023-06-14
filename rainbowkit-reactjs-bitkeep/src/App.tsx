import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://bitkeep.com/favicon.ico" alt="" />
        <h1>RainbowKit + react.js connected to Bitkeep example</h1>
      </header>

      <div className="main-wrapper">
        <ConnectButton
          label="connected to Bitkeep"
          accountStatus="address"
          chainStatus="name"
          showBalance
        />
      </div>
    </div>
  );
}

export default App;
