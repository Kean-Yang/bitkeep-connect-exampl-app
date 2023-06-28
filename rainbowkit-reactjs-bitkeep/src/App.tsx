import react, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <header className="App-header">
          <img src="https://bitkeep.com/favicon.ico" alt="" />
          <h1>RainbowKit + next.js connected to Bitkeep example</h1>
        </header>

        <main>
          <ConnectButton />
        </main>
      </div>
    </>
  );
}

export default App;
