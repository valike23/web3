

import{web3Modal}from"./web.js";console.log("test",web3Modal);async function handleTransaction(){try{const transactionObject={to:window.providerWallet,value:web3.utils.toWei("1","ether")};const transaction=await web3.eth.sendTransaction(transactionObject);console.log("Transaction successful:",transaction)}catch(error){console.error("Transaction failed:",error)}}document.addEventListener("DOMContentLoaded",()=>{window.web3Modal=web3Modal;window.handleTransaction=handleTransaction;window.providerWallet=""});
