import { WalletConnectModalSign } from 'https://unpkg.com/@walletconnect/modal-sign-html';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import { ethers } from "https://cdnjs.cloudflare.com/ajax/libs/ethers/6.6.3/ethers.js";


const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;

const walletProviders = [
  {
    name: "Trust Wallet",
    url: "https://rpc.example.com", // Replace with the actual RPC URL for Trust Wallet
    chainId: 1, // Replace with the actual chainId for Trust Wallet
  },
  {
    name: "MetaMask",
    url: "https://mainnet.infura.io/v3/005f383074a348c69880804be315e8a0", // Replace with the actual Infura API URL or your custom node URL for MetaMask
    chainId: mainnet, // Replace with the actual chainId for MetaMask
  },
];
// 0. Define ui elements
const connectButton = document.getElementById("connect-button");
const w3Button = document.getElementById("web3-button");

const projectId = "2aca272d18deb10ff748260da5f78bfd";
window.onload = ()=>{
 return new WalletConnectModalSign({
    projectId,
    metadata: {
      name: "My Dapp",
      description: "My Dapp description",
      url: "https://my-dapp.com",
      icons: ["https://my-dapp.com/logo.png"],
    },
    providerOptions: walletProviders
  });
}


async function onConnect() {
  try {
    connectButton.disabled = true;
    const session = await web3Modal.connect({
      requiredNamespaces: {
        eip155: {
          methods: ["eth_sendTransaction", "personal_sign"],
          chains: ["eip155:1"],
          events: ["chainChanged", "accountsChanged"],
        },
      },
    });
    console.info(session);
    window.provider = session;
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
  
}

async function connectWeb3() {
  try {
    const provider = window.provider;
    console.log('my provider', provider);
    const etherProvider = new  ethers.providers.Web3Provider(provider);
    
  } catch (err) {
    console.error(err);
  }
}

// 5. Create connection handler
connectButton.addEventListener("click", onConnect);


// 5. Create connection handler
w3Button.addEventListener("click", connectWeb3);