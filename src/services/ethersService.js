import { ethers } from 'ethers';
import config from '../config/config.js';

const ethereum = config.ethereum;
const provider = new ethers.JsonRpcProvider(ethereum.rpcUrl);
// const wallet = new ethers.Wallet(ethereum.privateKey, provider);

// const contractAddress = ethereum.contractAddress;
// const contract = new ethers.Contract(contractAddress, ethereum.contractAbi, wallet);
// contract.connect(wallet);

// const postFunction = ethereum.contractFunction;
// const readFunction = ethereum.readFunction;

async function sendCID(cid) {
  // return await contract[postFunction](cid);
  return cid;
}

async function readCIDs() {
  const data = ""// await contract[readFunction];
  return data;
}

export default { sendCID, readCIDs };
