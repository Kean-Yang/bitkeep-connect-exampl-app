import React, { useEffect, useState } from "react";
import "./App.css";
import * as ethers from "ethers";

function App() {
  const [wallet, setWallet] = useState("bitkeep");
  const [chainid, setChainId] = useState(1);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const Erc20API = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_from",
          type: "address",
        },
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "version",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "balance",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "_spender",
          type: "address",
        },
        {
          name: "_value",
          type: "uint256",
        },
        {
          name: "_extraData",
          type: "bytes",
        },
      ],
      name: "approveAndCall",
      outputs: [
        {
          name: "success",
          type: "bool",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "_owner",
          type: "address",
        },
        {
          name: "_spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          name: "remaining",
          type: "uint256",
        },
      ],
      payable: false,
      type: "function",
    },
    {
      inputs: [
        {
          name: "_initialAmount",
          type: "uint256",
        },
        {
          name: "_tokenName",
          type: "string",
        },
        {
          name: "_decimalUnits",
          type: "uint8",
        },
        {
          name: "_tokenSymbol",
          type: "string",
        },
      ],
      type: "constructor",
    },
    {
      payable: false,
      type: "fallback",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "_from",
          type: "address",
        },
        {
          indexed: true,
          name: "_to",
          type: "address",
        },
        {
          indexed: false,
          name: "_value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "_owner",
          type: "address",
        },
        {
          indexed: true,
          name: "_spender",
          type: "address",
        },
        {
          indexed: false,
          name: "_value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
  ];

  /**
   * @description get Provider
   * @return void
   */
  //  BitKeep injects a global API into websites visited by its users at window?.bitkeep?.ethereum. This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions. The presence of the provider object indicates an Ethereum user.

  const getProvider = (type = "bitkeep") => {
    if (type === "bitkeep") {
      let provider = window.bitkeep && window.bitkeep.ethereum;

      if (!provider) {
        window.location.href = "https://bitkeep.com/zh/download?type=2";
      }
      return provider;
    }

    //MetaMask injected
    return window.ethereum;
  };

  // new Web3 Provider
  const newWeb3Provider = () => {
    const provider = getProvider(wallet);
    return new ethers.providers.Web3Provider(provider);
  };

  /**
   * @description get user address
   * @return void
   */
  const getAddress = async () => {
    const accounts = await newWeb3Provider().listAccounts();
    return accounts[0];
  };

  /**
   * @description get user balance
   * @return void
   */
  const getBalance = async () => {
    const address = await getAddress();
    const balance = await newWeb3Provider().getBalance(address);
    return ethers.utils.formatEther(balance);
  };

  /**
   * @description get ChainId
   * @return void
   */
  const getChainId = async () => {
    const { chainId } = await newWeb3Provider().getNetwork();

    console.log(await newWeb3Provider().getNetwork());

    return parseInt(chainId);
  };

  /**
   * @description get Account Data
   * @return void
   */
  const getAccountData = async () => {
    let balance = await getBalance();
    setBalance(balance);

    let chainId = await getChainId();
    setChainId(chainId);

    let address = await getAddress();
    setAddress(address);
  };

  /**
   * @description listener event
   * @return void
   */
  const listenser = async (provider) => {
    // reomove all listeners
    // provider.removeAllListeners()
    provider.removeListener("accountsChanged", AccountsChangedHandler);
    provider.removeListener("chainChanged", ChainChangedHandler);

    // Handle the new accounts, or lack thereof.
    // "accounts" will always be an array, but it can be empty.
    function AccountsChangedHandler(accounts) {
      let address = accounts[0];
      setAddress(address);
      getAccountData();
    }

    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    function ChainChangedHandler(chainId) {
      console.log(chainId);
      let chainid = parseInt(chainId, 16);
      setChainId(chainid);
      getAccountData();
    }

    // The BitKeep provider emits this event whenever the return value of the eth_accounts RPC method changes. eth_accounts returns an array that is either empty or contains a single account address. The returned address, if any, is the address of the most recently used account that the caller is permitted to access. Callers are identified by their URL origin, which means that all sites with the same origin share the same permissions.
    // This means that accountsChanged will be emitted whenever the user's exposed account address changes.
    provider.on("accountsChanged", AccountsChangedHandler);

    // chainChanged The BitKeep provider emits this event when the currently connected chain changes.
    // All RPC requests are submitted to the currently connected chain. Therefore, it's critical to keep track of the current chain ID by listening for this event.
    // We strongly recommend reloading the page on chain changes, unless you have good reason not to.
    provider.on("chainChanged", ChainChangedHandler);
  };

  /**
   * @description switch Network
   * @return void
   */
  const switchNetwork = async (network) => {
    try {
      // 切换网络
      await newWeb3Provider().request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: network.chainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        // 添加网络
        await newWeb3Provider().request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xf00",
              chainName: "...",
              rpcUrls: ["https://..."] /* ... */,
            },
          ],
        });
      }
    }
  };

  /**
   * @description Connect Bitkeep
   * @return void
   */
  const connected = async () => {
    try {
      const provider = getProvider("bitkeep");
      setWallet("bitkeep");
      await provider
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          getAccountData();
          listenser(provider);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   * @description Connect MetaMask
   * @return void
   *
   */
  const metaMaskConnected = async () => {
    try {
      const provider = getProvider("injected");
      setWallet("injected");
      await provider
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          getAccountData();
          listenser(provider);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   * @description Transfer Ether
   * @return void
   */
  const sendEther = async (toAddress, amount) => {
    try {
      const provider = await newWeb3Provider();
      const signer = provider.getSigner();
      const transaction = {
        to: toAddress,
        value: ethers.utils.parseEther(amount),
      };
      return await signer.sendTransaction(transaction).hash;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // send token
  const sendToken = async (
    toAddress,
    amount,
    contractAddress,
    decimals,
    gasPrice
  ) => {
    try {
      const provider = await newWeb3Provider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Erc20API, signer);
      const tokenAmount = ethers.utils.parseUnits(amount, decimals);
      const gasLimit = await contract.estimateGas.transfer(
        toAddress,
        tokenAmount
      );
      const transaction = {
        to: contractAddress,
        gasPrice: ethers.utils.parseUnits(gasPrice, "gwei"),
        gasLimit: gasLimit,
        value: 0,
        data: contract.interface.encodeFunctionData("transfer", [
          toAddress,
          tokenAmount,
        ]),
      };
      const txResponse = await signer.sendTransaction(transaction);
      return txResponse.hash;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    // other code
    getAccountData();
    if (address) {
      const provider = getProvider(wallet);
      listenser(provider);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, wallet]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Connected to wallet example</h1>
        <p>chainId: {chainid} </p>
        <p>address: {address || ""} </p>
        <p>balance: {balance || ""} </p>
      </header>

      <div className="main-wrapper">
        <button onClick={() => connected()}>connected to Bitkeep</button>

        <button onClick={() => metaMaskConnected()}>
          connected to Injected
        </button>

        <button onClick={() => switchNetwork({ chainId: "0x38" })}>
          switch Network
        </button>
        <button
          onClick={() =>
            sendEther("0x8b13d2f6707586c298339ADDf90CEd908993F47d", "0.1")
          }
        >
          sendEther
        </button>
        <button
          onClick={() =>
            sendToken(
              "0x8b13d2f6707586c298339ADDf90CEd908993F47d",
              "10",
              "0x55d398326f99059ff775485246999027b3197955",
              18,
              "0.000063"
            )
          }
        >
          sendToken
        </button>
      </div>
    </div>
  );
}

export default App;
