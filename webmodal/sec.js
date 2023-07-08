import { web3Modal } from "./web.js";

console.log('test',web3Modal);
async function handleTransaction() {
    try {
     //   const accounts = await web3Modal.connect();
       // const address = accounts[0];

        // Replace with your own transaction logic
        const transactionObject = {
            to: '0x1234567890', // Replace with the recipient's address
            value: web3.utils.toWei('1', 'ether'), // Replace with the amount to send
        };

        const transaction = await web3.eth.sendTransaction(transactionObject);
        console.log('Transaction successful:', transaction);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.web3Modal = web3Modal;
  //  window.handleTransaction = handleTransaction;

    
});

  