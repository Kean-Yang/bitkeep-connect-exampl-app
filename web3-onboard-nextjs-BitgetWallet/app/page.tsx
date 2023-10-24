"use client";
import Onboard from "@web3-onboard/core";
import bitkeepModule from "@web3-onboard/bitkeep";
import bitgetModule from "./bitgetWallet";

const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";
const bitKeep = bitkeepModule();
const bitgetWallet = bitgetModule();

export default function Home({}) {
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
      name: "My App",
      icon: "https://web3.bitget.com/favicon.ico",
      description: "My app using Onboard",
    },
  });


  const connect = async () => {
    return await onboard.connectWallet();
  };

  return (
    <div className="App">
      <div className="App-header">
        <img className="my-4" src="https://web3.bitget.com/favicon.ico" alt="" />
        <h1>web3-onboard + Next.js connected to Bitget Wallet example</h1>
      </div>

      <div className="main-wrapper">
        <button className="cursor-pointer border-solid" onClick={connect}>
          connect Wallet{" "}
        </button>
      </div>
    </div>
  );
}
