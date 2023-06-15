import React from "react";
import "./App.css";
import Onboard from "@web3-onboard/core";
import trustModule from "@web3-onboard/trust";
import { bitKeep } from "./bitKeepWallet";

const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";
const trust = trustModule();

function App() {
  const onboard = Onboard({
    wallets: [bitKeep, trust],
    chains: [
      {
        id: "0x1",
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: MAINNET_RPC_URL,
      },
    ],
    appMetadata: {
      name: "connect Bitkeep example",
      icon: "https://bitkeep.com/favicon.ico",
      description: "My app using Onboard",
    },
  });

  const connect = async () => {
    return await onboard.connectWallet();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>web3-onboard + react.js connected to Bitkeep example</h1>
      </header>

      <div className="main-wrapper">
        <button onClick={connect}>connect Wallet </button>
      </div>
    </div>
  );
}

export default App;
