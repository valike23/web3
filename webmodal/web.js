import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
  } from "https://unpkg.com/@web3modal/ethereum@2.6.2";
  import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";
  //import { getAccount, getContract } from 'https://unpkg.com/@wagmi/core';
  

  const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;
  const { configureChains, createConfig,getAccount  } = WagmiCore;

  export const chains = [mainnet, polygon, avalanche, arbitrum];
  export const projectId = "7cf9e2e6c54e2bf44d82eb56001e2d11";
  const clients = configureChains(chains, [w3mProvider({ projectId })]);
  const publicClient = clients.publicClient;
  console.log("clients here", clients, "public client here", publicClient);
  console.log('wallet connect wagmi', WagmiCoreConnectors);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      ...w3mConnectors({ chains, version: 2, projectId }),
      new WagmiCoreConnectors.CoinbaseWalletConnector({
        chains,
        options: {
          appName: "pepcoin",
        },
      }),
      new WagmiCoreConnectors.MetaMaskConnector({
        chains,
        options: {
          appName: "pepcoin",
        },
      }),
      
    ],
    publicClient,
  });
  export const ethereumClient = new EthereumClient(wagmiConfig, chains);
  export let web3Modal;
  try {
    
 web3Modal = new Web3Modal(
    {
      projectId,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    }
    ,ethereumClient
  );
  } catch (error) {
    console.log(error)
  }
  // 3. Create ethereum and modal clients
  
  console.log('client', ethereumClient);
 export const provider = publicClient({chainId: chains[0]});
  


  let defaultChain = await web3Modal.setDefaultChain(chains[0]);
  console.log('default chains here: ', defaultChain);

  
 

  
