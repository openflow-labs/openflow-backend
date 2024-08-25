const { ethers } = require('ethers');
const config = require('../config/config');

const provider = new ethers.JsonRpcProvider(config.ethereum.rpcUrl);
const wallet = new ethers.Wallet(config.ethereum.privateKey, provider);

async function sendTransaction(to, value) {
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.parseEther(value),
  });
  return tx;
}

async function readOnChainData(contractAddress, abi, method, ...args) {
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  const data = await contract[method](...args);
  return data;
}

module.exports = { sendTransaction, readOnChainData };
