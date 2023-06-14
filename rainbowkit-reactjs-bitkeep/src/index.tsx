import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, goerli, mainnet, optimism, polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { bitKeepWallet } from "./bitKeepWallet/bitKeepWallet";
import "./index.css";
import App from "./App";

/**
 * @description Configure your desired chains and generate the required connectors. You will also need to setup a wagmi config.
 * @return void
 */
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

// Customizing the wallet list
/**
 * @description You can import individual wallets from '@rainbow-me/rainbowkit/wallets' along with the connectorsForWallets function to build your own list of wallets with their necessary connectors. This way you have full control over which wallets to display, and in which order.
 * @return void
 */
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      walletConnectWallet({ chains }),
      bitKeepWallet({ chains }),
      metaMaskWallet({ chains }),
    ],
  },
]);

// You can then pass your connectors to wagmi's createConfig.
/**
 * @description createConfig;
 * @return void
 */
const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Wrap providers */}
    {/* Wrap your application with RainbowKitProvider and WagmiConfig. */}
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

reportWebVitals();
