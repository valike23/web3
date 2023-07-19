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
  export const projectId = "2aca272d18deb10ff748260da5f78bfd";
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
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
    ],
    publicClient,
  });
  // 3. Create ethereum and modal clients
  export const ethereumClient = new EthereumClient(wagmiConfig, chains);
  console.log('client', ethereumClient);
 export const provider = publicClient({chainId: chains[0]});
  

  export const web3Modal = new Web3Modal(
    {
      projectId,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    },
    ethereumClient
  );

  let defaultChain = await web3Modal.setDefaultChain(chains[0]);
  console.log('default chains here: ', defaultChain);
  const account = getAccount()
  console.log('accounts here', account );

  
 

  
