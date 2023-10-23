import react, { useState } from "react";
import { WalletInfo } from "@bitget-wallet/web3-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <header className="app-header">
          <a href={WalletInfo.downloadLinks.website}>
            <img src="https://static-web.bitkeep.com/17c3dc65b04a52709561f1c2f7d0ccd8/img/9f0c375dcd93.png" alt="" />
          </a>

          <h1>RainbowKit + react.js connected to {WalletInfo.name} example</h1>
        </header>
        <main>
          <div className="app-main">
            <ConnectButton />
          </div>

          <div className="app-download">
            <h3> Download {WalletInfo.name}</h3>

            <div className="app-download-list">
              <a href={WalletInfo.downloadLinks.android}>
                <img
                  src="https://static-web.bitkeep.com/17c3dc65b04a52709561f1c2f7d0ccd8/img/edbe6b134a07.svg"
                  alt=""
                />
                Android
              </a>

              <a href={WalletInfo.downloadLinks.ios}>
                <img
                  src="https://cdn.bitkeep.vip/u_b_e7e0e0d0-e705-11ec-a810-956323528725.png"
                  alt=""
                />
                iOS
              </a>
              <a href={WalletInfo.downloadLinks.ios}>
                <img
                  src="https://cdn.bitkeep.vip/u_b_74f213b0-e704-11ec-a810-956323528725.png"
                  alt=""
                />
                Chrome
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
