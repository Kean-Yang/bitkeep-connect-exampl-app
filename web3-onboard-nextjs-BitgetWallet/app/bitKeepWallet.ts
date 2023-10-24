import { LegacyEip1193Adapter, currentProvider, getIsInstall, getDownload, installWalletMessage } from '@bitget-wallet/web3-sdk'
const sdkAdapter = new LegacyEip1193Adapter();
const appInfo = sdkAdapter.getWalletInfo();
const logo = sdkAdapter.getLogo()

export const bitkeep = () => ({
  label: appInfo.name,
  getIcon: async () => await logo,
  getInterface: async () => {
    let provider: any = null;
    if (getIsInstall()) {
      provider = currentProvider()
    } else {
      window.open(getDownload(), '_blank')
      throw new Error(installWalletMessage);
    }
    return { provider }
  },
});

