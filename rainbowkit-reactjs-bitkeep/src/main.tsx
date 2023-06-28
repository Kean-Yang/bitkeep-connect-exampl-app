import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  bitskiWallet,
  dawnWallet,
  imTokenWallet,
  ledgerWallet,
  mewWallet,
  okxWallet,
  omniWallet,
  phantomWallet,
  rabbyWallet,
  tahoWallet,
  xdefiWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { bitKeepWallet } from "./bitKeepWallet/bitKeepWallet";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  arbitrum,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
  goerli,
  baseGoerli,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const projectId = "ce22b1c3d0c5ac1a88c1bf164be33ff5";
const NEXT_PUBLIC_ENABLE_TESTNETS = "true";
const NEXT_PUBLIC_ALCHEMY_ID = "";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    bsc,
    zora,
    ...(NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli, baseGoerli] : []),
  ],
  [alchemyProvider({ apiKey: NEXT_PUBLIC_ALCHEMY_ID || "" }), publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
  projectId,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains, projectId }),
      bitKeepWallet({ chains, projectId }),
      bitskiWallet({ chains }),
      dawnWallet({ chains }),
      imTokenWallet({ chains, projectId }),
      ledgerWallet({ chains, projectId }),
      mewWallet({ chains }),
      okxWallet({ chains, projectId }),
      omniWallet({ chains, projectId }),
      phantomWallet({ chains }),
      rabbyWallet({ chains }),
      tahoWallet({ chains }),
      xdefiWallet({ chains }),
      zerionWallet({ chains, projectId }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
