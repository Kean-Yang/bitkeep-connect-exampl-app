"use client";
import Onboard from "@web3-onboard/core";
import trustModule from "@web3-onboard/trust";
import { bitKeep } from "./bitKeepWallet";

const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";
const trust = trustModule();

export default function Home({}) {
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
      name: "My App",
      icon: "<SVG_ICON_STRING>",
      description: "My app using Onboard",
    },
  });

  const connect = async () => {
    return await onboard.connectWallet();
  };

  return (
    <div className="App">
      <div className="App-header">
        <img className="my-4" src="https://bitkeep.com/favicon.ico" alt="" />
        <h1>web3-onboard + Next.js connected to Bitkeep example</h1>
      </div>

      <div className="main-wrapper">
        <button className="cursor-pointer border-solid" onClick={connect}>
          connect Wallet{" "}
        </button>
      </div>
    </div>
  );
}
