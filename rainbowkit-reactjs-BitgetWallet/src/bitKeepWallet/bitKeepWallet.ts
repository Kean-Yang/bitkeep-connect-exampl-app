import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
export type { Wallet } from "@rainbow-me/rainbowkit";
import { getWalletConnectConnector, Wallet } from "@rainbow-me/rainbowkit";
import { LegacyEip1193Adapter } from '@bitget-wallet/web3-sdk'

import type { Connector } from "wagmi/connectors";
import type { Chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

type InjectedConnectorOptions = {
  name?: string | ((detectedName: string | string[]) => string);
  shimDisconnect?: boolean;
};
type WalletConnectConnectorConfig = ConstructorParameters<
  typeof WalletConnectConnector
>[0];
interface BitKeepWalletOptions {
  projectId?: string;
  chains: Chain[];
  shimDisconnect?: boolean;
  walletConnectVersion?: "2";
  walletConnectOptions?: WalletConnectConnectorConfig["options"];
}
interface BitKeepWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: "1";
  walletConnectOptions?: WalletConnectConnectorConfig["options"];
}

type BitKeepConnectorOptions = Pick<InjectedConnectorOptions, "shimDisconnect">;

export function isAndroid(): boolean {
  return (
    typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)
  );
}

export async function getWalletConnectUri(
  connector: Connector,
  version: "1" | "2"
): Promise<string> {
  const provider = await connector.getProvider();
  return version === "2"
    ? new Promise<string>((resolve) => provider.once("display_uri", resolve))
    : provider.connector.uri;
}

function isBitKeep(ethereum: NonNullable<(typeof window)["ethereum"]>) {
  // Logic borrowed from wagmi's bitKeepConnector
  // https://github.com/tmm/wagmi/blob/main/packages/core/src/connectors/bitKeep.ts
  const isBitKeep = Boolean(ethereum.isBitKeep);

  if (!isBitKeep) {
    return false;
  }

  // Brave tries to make itself look like bitKeep
  // Could also try RPC `web3_clientVersion` if following is unreliable
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false;
  }

  if (ethereum.isTokenPocket) {
    return false;
  }

  if (ethereum.isTokenary) {
    return false;
  }

  return true;
}

class BitKeepConnector extends InjectedConnector {
  id: string;
  ready: boolean;
  provider?: NonNullable<(typeof window)["ethereum"]>;
  constructor({
    chains = [],
    options: options_,
  }: {
    chains?: Chain[];
    options?: BitKeepWalletOptions;
  } = {}) {
    const options = {
      name: "BitKeep",
      ...options_,
    };
    super({ chains, options });

    this.id = "Bitkeep";
    this.ready =
      typeof window != "undefined" &&
      !!this.findProvider(((window as any).bitkeep as any)?.ethereum);
  }

  async getProvider() {
    if (typeof window !== "undefined") {
      // TODO: Fallback to `ethereum#initialized` event for async injection
      // https://github.com/BitKeep/detect-provider#synchronous-and-asynchronous-injection=
      this.provider = ((window as any).bitkeep as any)?.ethereum;
      // typeof window !== 'undefined'
      //   ? ((window as any).bitkeep as any)?.ethereum
      //   : undefined;
    }
    return this.provider;
  }
  getReady(ethereum: NonNullable<(typeof window)["ethereum"]>) {
    if (!ethereum || !ethereum.isBitKeep) return;
    // Brave tries to make itself look like BitKeep
    // Could also try RPC `web3_clientVersion` if following is unreliable
    if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) return;
    if (ethereum.isTokenPocket) return;
    if (ethereum.isTokenary) return;
    return ethereum;
  }
  findProvider(ethereum: NonNullable<(typeof window)["ethereum"]>) {
    if (ethereum?.providers) return ethereum.providers.find(this.getReady);
    return this.getReady(ethereum);
  }
}

export const bitKeepWallet = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}: (BitKeepWalletLegacyOptions | BitKeepWalletOptions) &
  InjectedConnectorOptions): Wallet => {
  const providers =
    typeof window !== "undefined" &&
    ((window as any).bitkeep as any)?.ethereum.providers;

  // Not using the explicit isBitKeep fn to check for bitKeep
  // so that users can continue to use the bitKeep button
  // to interact with wallets compatible with window.ethereum.
  // The connector's getProvider will instead favor the real bitKeep
  // in window.providers scenarios with multiple wallets injected.

  const isBitKeepInjected =
    typeof window !== "undefined" &&
    (window as any).bitkeep !== undefined &&
    ((window as any).bitkeep as any)?.ethereum !== undefined &&
    isBitKeep(((window as any).bitkeep as any)?.ethereum);

  const shouldUseWalletConnect = !isBitKeepInjected;

  return {
    id: 'bitget',
    name: 'Bitget Wallet',
    iconUrl: async () => (await import('./bitgetWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isBitKeepInjected : undefined,
    downloadUrls: {
      android: 'https://web3.bitget.com/zh-CN/wallet-download?type=0',
      ios: 'https://web3.bitget.com/zh-CN/wallet-download?type=1',
      mobile: 'https://web3.bitget.com/zh-CN/wallet-download?type=2',
      qrCode: 'https://web3.bitget.com/zh-CN/wallet-download',
      chrome:
        'https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak',
      browserExtension: 'https://web3.bitget.com/zh-CN/wallet-download',
    },

    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? getWalletConnectConnector({
            chains,
            options: walletConnectOptions,
            projectId,
            version: walletConnectVersion,
          })
        : new InjectedConnector({
            chains,
            options: {
              // @ts-expect-error
              getProvider: () => window.bitkeep.ethereum,
              ...options,
            },
          });

      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);

        return isAndroid()
          ? uri
          : `bitkeep://wc?uri=${encodeURIComponent(uri)}`;
      };

      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: 'https://web3.bitget.com/zh/academy',
            steps: [
              {
                description:
                  'We recommend pinning BitKeep to your taskbar for quicker access to your wallet.',
                step: 'install',
                title: 'Install the BitKeep extension',
              },
              {
                description:
                  'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'Once you set up your wallet, click below to refresh the browser and load up the extension.',
                step: 'refresh',
                title: 'Refresh your browser',
              },
            ],
          },
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: 'https://web3.bitget.com/zh/academy',
                steps: [
                  {
                    description:
                      'We recommend putting BitKeep on your home screen for quicker access.',
                    step: 'install',
                    title: 'Open the BitKeep app',
                  },
                  {
                    description:
                      'Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.',
                    step: 'create',
                    title: 'Create or Import a Wallet',
                  },
                  {
                    description:
                      'After you scan, a connection prompt will appear for you to connect your wallet.',
                    step: 'scan',
                    title: 'Tap the scan button',
                  },
                ],
              },
            }
          : undefined,
      };
    },
  };
};

export default {};
