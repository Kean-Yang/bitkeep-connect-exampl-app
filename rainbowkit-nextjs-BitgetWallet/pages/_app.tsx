import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  bitgetWallet,
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";

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
  [
    // alchemyProvider({ apiKey: NEXT_PUBLIC_ALCHEMY_ID || "" }),
    publicProvider(),
  ]
);


const connectors = connectorsForWallets([
  {
    groupName: "Recommended use",
    wallets: [
      rainbowWallet({ chains, projectId }),
      metaMaskWallet({ chains, projectId }),
      walletConnectWallet({ chains, projectId }),
      bitgetWallet({ chains, projectId }),
    ],
  }
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
