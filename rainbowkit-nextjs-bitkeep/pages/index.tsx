import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <header className="App-header">
          <img src="https://bitkeep.com/favicon.ico" alt="" />
          <h1>RainbowKit + next.js connected to Bitkeep example</h1>
        </header>

        <main className={styles.main}>
          <ConnectButton />
        </main>
      </div>
    </div>
  );
};

export default Home;
