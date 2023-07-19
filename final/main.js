import walletconnectEthereumProvider from 'https://cdn.skypack.dev/@walletconnect/ethereum-provider';
import { WalletConnectModal } from 'https://unpkg.com/@walletconnect/modal'
import { Web3Modal } from 'https://unpkg.com/@web3modal/html'

/* Using these following cdn packages also give an error "EthereumProvider not provided/found as export" */
//import { EthereumProvider } from 'https://cdn.skypack.dev/@walletconnect/ethereum-provider';
//import { EthereumProvider } from 'https://unpkg.com/@walletconnect/ethereum-provider';

let ethereumProvider = undefined;
const connectButton = document.getElementById("connect-button");
async function onConnect() {
  try {
    connectButton.disabled = true;

    if (!ethereumProvider) {
      ethereumProvider = await walletconnectEthereumProvider.init({
        projectId,
        showQrModal: true,
        chains: [5],
		rpcMap: {
          [5]: "https://goerli.infura.io/v3/*******",
        },
        methods: ["eth_sendTransaction", "personal_sign"],
        events: ["chainChanged", "accountsChanged"],
      });

      ethereumProvider.on("connect", () =>
        console.log(ethereumProvider.accounts)
      );
    }

    ethereumProvider.connect();
  } catch (err) {
    console.log(err);
  } finally {
    connectButton.disabled = false;
  }
}

jQuery('#connect-button').on('click', async function(e) { 
	e.preventDefault; 
	await onConnect();
});

if(ethereumProvider) {
    let web3 = new Web3(ethereumProvider);
	setInterval(function () { 
		web3.eth.getBlockNumber().then(data => {   
			console.log(data); 
		});
	}, 6000);
}