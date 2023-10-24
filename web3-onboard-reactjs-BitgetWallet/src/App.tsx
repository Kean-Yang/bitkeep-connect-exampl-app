import React, { useState } from "react";
import "./App.css";
import Onboard from "@web3-onboard/core";
import bitkeepModule from "@web3-onboard/bitkeep";
import bitgetModule from "@web3-onboard/bitget";

const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";
const bitKeep = bitkeepModule();
const bitgetWallet = bitgetModule();

function App() {
  const [wallets, steWallets] = useState({ icon: "" });
  const onboard = Onboard({
    wallets: [bitKeep, bitgetWallet],
    chains: [
      {
        id: "0x1",
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: MAINNET_RPC_URL,
      },
    ],
    appMetadata: {
      name: "connect Bitget Wallet example",
      icon: "https://web3.bitget.com/favicon.ico",
      description: "My app using Onboard",
    },
  });

  const connect = async () => {
    let Wallet = await onboard.connectWallet();
    console.log(Wallet[0]);
    steWallets(Wallet[0]);
    return await onboard.connectWallet();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={
            wallets?.icon
              ? wallets?.icon
              : "https://web3.bitget.com/favicon.ico"
          }
          alt=""
        />
        <h1>web3-onboard + react.js connected to Bitget Wallet example</h1>
      </header>

      <div className="main-wrapper">
        <button onClick={connect}>connect Wallet </button>
      </div>
    </div>
  );
}

export default App;
