import { WalletInfo } from "@bitget-wallet/web3-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <header className="App-header">
          <Image src="https://static-web.bitkeep.com/17c3dc65b04a52709561f1c2f7d0ccd8/img/9f0c375dcd93.png" width={316} height={56}  alt="" />
          <h1>RainbowKit + next.js connected to {WalletInfo.name} example</h1>
        </header>

        <main className={styles.main}>
          <ConnectButton />
        </main>

        <div className="app-download">
          <h3> Download {WalletInfo.name}</h3>

          <div className="app-download-list">
            <a href={WalletInfo.downloadLinks.android}>
              <Image
                width={30}
                height={30}
                src="https://static-web.bitkeep.com/17c3dc65b04a52709561f1c2f7d0ccd8/img/edbe6b134a07.svg"
                alt=""
              />
              Android
            </a>

            <a href={WalletInfo.downloadLinks.ios}>
              <Image
                width={30}
                height={30}
                src="https://cdn.bitkeep.vip/u_b_e7e0e0d0-e705-11ec-a810-956323528725.png"
                alt=""
              />
              iOS
            </a>
            <a href={WalletInfo.downloadLinks.ios}>
              <Image
                width={30}
                height={30}
                src="https://cdn.bitkeep.vip/u_b_74f213b0-e704-11ec-a810-956323528725.png"
                alt=""
              />
              Chrome
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
