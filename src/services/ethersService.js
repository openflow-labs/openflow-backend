import { ethers } from 'ethers';
import { ethereum } from '../config/config';

const provider = new ethers.providers.JsonRpcProvider(ethereum.rpcUrl);
const wallet = new ethers.Wallet(ethereum.privateKey, provider);

const contractAddress = ethereum.contractAddress;
const contract = new ethers.Contract(contractAddress, ethereum.contractAbi, wallet);
contract.connect(wallet);

const postFunction = ethereum.contractFunction;
const readFunction = ethereum.readFunction;

async function sendCID(cid) {
  return await contract[postFunction](cid);
}

async function readCIDs() {
  const data = await contract[readFunction];
  return data;
}

export default { sendCID, readCIDs };
