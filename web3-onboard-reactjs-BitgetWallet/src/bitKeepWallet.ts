import { LegacyEip1193Adapter, currentProvider, getIsInstall, getDownload, installWalletMessage } from '@bitget-wallet/web3-sdk'

const sdkAdapter = new LegacyEip1193Adapter();
const appInfo = sdkAdapter.getWalletInfo();
const logo = sdkAdapter.getLogo()

export const bitKeep = () => ({
  label: appInfo.name,
  getIcon: async () => await logo,
  getInterface: async () => {
    const ethereumInjectionExists = window.hasOwnProperty("ethereum");
    let provider: any = null;
    // check if trust is injected into window.ethereum
    if (ethereumInjectionExists && (window as any)?.bitkeep?.isBitKeep) {
      provider = (window as any)?.ethereum;
    } else if ((window as any)?.bitkeep) {
      // directly use the window.bitkeep.ethereum injection
      provider = (window as any)?.bitkeep?.ethereum;
    } else {
      // BitKeep Wallet extension is not installed
      // send user to install page
      window.open(getDownload(), '_blank')
      throw new Error(installWalletMessage);
    }

    return {
      provider,
    };
  },
});
